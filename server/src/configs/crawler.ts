const WATER_PROVIDER_URL = process.env.WATER_PROVIDER_URL
  ?? 'https://agenciavirtual.sabesp.com.br'
const WATER_PROVIDER_RATES_PAGE = process.env.WATER_PROVIDER_RATES_PAGE
  ?? '/web/guest/tarifas'

const THOUSAND_MILLISECONDS = 1000
const CRAWLER_TIMEOUT_IN_SECONDS = Number(process.env.CRAWLER_TIMEOUT_IN_SECONDS) ?? 30

const CRAWLER_WINDOW_HEIGHT = 1050
const CRAWLER_WINDOW_WIDTH = 1050
const CRAWLER_WINDOW_POS_X = 10
const CRAWLER_WINDOW_POS_Y = 10

export const crawlerConfig = {
  driverTimeout: CRAWLER_TIMEOUT_IN_SECONDS * THOUSAND_MILLISECONDS,
  browserWindowRect: {
    height: CRAWLER_WINDOW_HEIGHT,
    width: CRAWLER_WINDOW_WIDTH,
    x: CRAWLER_WINDOW_POS_X,
    y: CRAWLER_WINDOW_POS_Y
  },
  urls: {
    consumptionTable: `${WATER_PROVIDER_URL}${WATER_PROVIDER_RATES_PAGE}`
  },
}
