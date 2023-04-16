import { ICategoryConversionRulesDTO } from '../dtos/ICategoryConversionRulesDTO'

export interface ICrawlerProvider {
  initCrawler(): Promise<void>
  closeCrawler(): Promise<void>
  fillCityForm(cityCode: number): Promise<void>
  readTableContent(): Promise<ICategoryConversionRulesDTO[]>
}
