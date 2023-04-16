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

      const categoryTableDataArray = await crawlerProvider.readTableContent()

      console.log('======> categoryTableDataArray', JSON.stringify(categoryTableDataArray, null, 2))

      // TODO: Ver se a cidade está cadastrada: citiesForConversionRepository

      // TODO: Verificar se está atualizado, se não, apagar a atual: citiesForConversionRepository

      // TODO: Cadastrar a cidade: citiesForConversionRepository
    }

    await crawlerProvider.closeCrawler()
  }
}
