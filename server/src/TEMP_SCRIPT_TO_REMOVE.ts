/**
 * ATT: TEMP SCRIPT [TO REMOVE]
 */

import { WATER_PROVIDER_CITY_CODES } from '@utils/constants'
import { SeleniumProvider } from '@shared/containers/providers/CrawlerProvider/implementations/SeleniumProvider'

const seleniumProvider = new SeleniumProvider()

const start = async () => {
  const citieKeys = Object.keys(WATER_PROVIDER_CITY_CODES)

  await seleniumProvider.initCrawler()

  for (const cityKey of citieKeys) {
    const cityCode = WATER_PROVIDER_CITY_CODES[cityKey as keyof typeof WATER_PROVIDER_CITY_CODES]

    await seleniumProvider.fillCityForm(cityCode)

    const categoryTableDataArray = await seleniumProvider.readTableContent()

    console.log('======> categoryTableDataArray', JSON.stringify(categoryTableDataArray, null, 2))
  }

  await seleniumProvider.closeCrawler()
}

start()
