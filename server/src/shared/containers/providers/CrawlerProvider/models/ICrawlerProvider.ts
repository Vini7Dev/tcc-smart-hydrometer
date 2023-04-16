import { ITableContentDTO } from '../dtos/ITableContentDTO'

export interface ICrawlerProvider {
  initCrawler(): Promise<void>
  closeCrawler(): Promise<void>
  fillCityForm(cityCode: number): Promise<void>
  readTableContent(): Promise<ITableContentDTO>
}
