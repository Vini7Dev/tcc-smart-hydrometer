interface IConsumptionConversion {
  rule: string
  water_rate: number
  sewer_rate: number
}

interface ICategoryForConversion {
  category: string
  consumptionConversions: IConsumptionConversion[]
}

export interface ICreateCityForConversionDTO {
  code: number
  name: string
  last_update: string
  categoriesForConversion: ICategoryForConversion[]
}
