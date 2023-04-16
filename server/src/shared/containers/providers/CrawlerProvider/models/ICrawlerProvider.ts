export interface ICrawlerProvider {
  initCrawler(): Promise<void>
  closeCrawler(): Promise<void>
  fillCityForm(cityCode: number): Promise<void>
}
