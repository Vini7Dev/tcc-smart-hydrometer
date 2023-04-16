import { JOB_UPDATE_CONSUPTION_CONVERSIONS, WATER_PROVIDER_CITY_CODES } from '@utils/constants'
import { IHandleProps } from '@shared/containers/providers/QueueProvider/implementation/BullProvider'
import { ICrawlerProvider } from '@shared/containers/providers/CrawlerProvider/models/ICrawlerProvider'
import { ICitiesForConversionRepository } from '@modules/citiesForConversion/repositories/ICitiesForConversionRepository'

interface IUpdateConsumptionConversionsProps extends IHandleProps {
  providers: {
    crawlerProvider: ICrawlerProvider
    citiesForConversionRepository: ICitiesForConversionRepository
  }
  data: {}
}

export default {
  key: JOB_UPDATE_CONSUPTION_CONVERSIONS,
  handle: async ({
    providers: {
      crawlerProvider,
      citiesForConversionRepository,
    },
    data: {},
  }: IUpdateConsumptionConversionsProps) => {
    const citieKeys = Object.keys(WATER_PROVIDER_CITY_CODES)

    await crawlerProvider.initCrawler()

    for (const cityKey of citieKeys) {
      const cityCode = WATER_PROVIDER_CITY_CODES[cityKey as keyof typeof WATER_PROVIDER_CITY_CODES]

      await crawlerProvider.fillCityForm(cityCode)

      const tableData = await crawlerProvider.readTableContent()

      const cityAlreadyExists = await citiesForConversionRepository.findByCode(cityCode)

      if (cityAlreadyExists) {
        if (cityAlreadyExists.last_update === tableData.lastUpdate) {
          continue
        }

        await citiesForConversionRepository.delete(cityAlreadyExists.id)
      }

      await citiesForConversionRepository.create({
        code: cityCode,
        name: cityKey,
        last_update: tableData.lastUpdate,
        categoriesForConversion: tableData.categories.map(({ category, rules }) => ({
          category,
          consumptionConversions: rules.map(({ rule, sewage, water }) => ({
            rule,
            sewer_rate: Number(sewage.replace(/[R\$|,|.| ]/g, '')),
            water_rate: Number(water.replace(/[R\$|,|.| ]/g, '')),
          }))
        }))
      })
    }

    await crawlerProvider.closeCrawler()
  }
}
