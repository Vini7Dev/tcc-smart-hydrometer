import webdriver, { Builder, By, until, WebDriver } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import chromedriver from 'chromedriver'

import { ICrawlerProvider } from '../models/ICrawlerProvider'
import { crawlerConfig } from '@configs/crawler'
import { categoriesForConversionArray } from '@utils/categoriesForConversionArray'
import { ITableContentDTO, ICategoryConversionRules, IRule } from '../dtos/ITableContentDTO'

type BySelectors = 'css'

interface IWaitForElementLoad {
  by: BySelectors
  selector: string
}

const {
  browserWindowRect,
  driverTimeout,
  urls: { consumptionTable },
} = crawlerConfig

const SELENIUM_OFF_DEFAULT = 'OFF'
const SELENIUM_ON_DEFAULT = 'ON'
const CHROME_BROWSE = 'chrome'

export class SeleniumProvider implements ICrawlerProvider {
  private driverStatus: 'OFF' | 'ON'

  private driver: WebDriver

  private driverTimeout: number

  constructor() {
    this.driverStatus = SELENIUM_OFF_DEFAULT
    this.driverTimeout = driverTimeout

    chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())
  }

  private async waitForElementLoad(elementToWait: IWaitForElementLoad): Promise<void> {
    await this.driver.wait(
      until.elementLocated(By[elementToWait.by](elementToWait.selector)),
      this.driverTimeout,
    )
  }

  public async initCrawler(): Promise<void> {
    this.driver = await new Builder()
      .forBrowser(CHROME_BROWSE)
      .withCapabilities(webdriver.Capabilities.chrome())
      .build()

    this.driver.manage().window().setRect(browserWindowRect)

    this.driverStatus = SELENIUM_ON_DEFAULT
  }

  public async closeCrawler(): Promise<void> {
    try {
      await this.driver.close()
    } catch (err) {
      console.error(err)
    } finally {
      this.driverStatus = SELENIUM_OFF_DEFAULT
      this.driver = null as unknown as WebDriver
    }
  }

  public async fillCityForm(cityCode: number): Promise<void> {
    await this.driver.get(consumptionTable)

    await this.waitForElementLoad({ by: 'css', selector: '#modal-neta' })
    await this.driver.executeScript('document.querySelector("#modal-neta").remove()')

    await this.waitForElementLoad({ by: 'css', selector: '.msgCookie' })
    await this.driver.executeScript('document.querySelector(".msgCookie").remove()')

    await this.waitForElementLoad({ by: 'css', selector: `option[value="${cityCode}"]` })
    await this.driver.findElement(By.css(`option[value="${cityCode}"]`)).click()

    await this.waitForElementLoad({ by: 'css', selector: 'select[id="_dxptarifas_WAR_dxptarifas_:tarifasForm:categorias-uso"]:not([disabled])' })
    await this.waitForElementLoad({ by: 'css', selector: 'option[value="TODAS"]' })
    await this.driver.findElement(By.css('option[value="TODAS"]')).click()

    await this.waitForElementLoad({ by: 'css', selector: 'input[value="Tarifas Atuais"]:not([disabled])' })
    await this.driver.findElement(By.css('input[value="Tarifas Atuais"]')).click()

    await this.waitForElementLoad({ by: 'css', selector: 'form[id="_dxptarifas_WAR_dxptarifas_:tarifasForm"] button[type="submit"]:not([disabled])' })
    await this.driver.findElement(By.css('form[id="_dxptarifas_WAR_dxptarifas_:tarifasForm"] button[type="submit"]')).click()
  }

  public async readTableContent(): Promise<ITableContentDTO> {
    await this.waitForElementLoad({ by: 'css', selector: 'table[class="table table-responsive table-striped"]' })

    const table = await this.driver.findElement(By.css('[class="table table-responsive table-striped"]'))

    const tableData = await table.findElements(By.css('tbody tr td'))

    const tableDataTextList = await Promise.all(tableData.map(async td => await td.getText()))

    let categoryDivisionIndex = -1
    const tableDataPerCategory: Array<string[]> = []

    tableDataTextList.forEach(item => {
      if (categoriesForConversionArray.findIndex(category => category === item) !== -1) {
        tableDataPerCategory.push([])
        categoryDivisionIndex += 1
      }

      tableDataPerCategory[categoryDivisionIndex].push(item)
    })

    const categoryTableDataArray: ICategoryConversionRules[] = []

    for (const categoryTableData of tableDataPerCategory) {
      const categoryName = categoryTableData.shift() as string
      const categoryRules = categoryTableData.filter(tableData => tableData !== '')

      const categoryRuleObjects: IRule[] = []

      let newRule: IRule = {} as IRule

      for (const categoryRule of categoryRules) {
        switch(true) {
          case categoryRule.indexOf(' a ') !== -1:
            newRule.rule = categoryRule
            break

          case categoryRule.indexOf('acima de ') !== -1:
            newRule.rule = categoryRule
            break

          case !newRule.water:
            newRule.water = categoryRule
            break

          case !newRule.sewage:
            newRule.sewage = categoryRule

            categoryRuleObjects.push(newRule)
            newRule = {} as IRule
            break

          default:
            continue
        }
      }

      categoryTableDataArray.push({
        category: categoryName,
        rules: categoryRuleObjects,
      })
    }

    await this.waitForElementLoad({ by: 'css', selector: '#tarifas > div > div:nth-child(2) > p:nth-child(2)' })

    const description = await this.driver.findElement(
      By.css('#tarifas > div > div:nth-child(2) > p:nth-child(2)')
    ).getText()

    const lastUpdateDate = description
      .split('a partir de')[1]
      .slice(0, -1)
      .trim()

    return {
      lastUpdate: lastUpdateDate,
      categories: categoryTableDataArray,
    }
  }
}
