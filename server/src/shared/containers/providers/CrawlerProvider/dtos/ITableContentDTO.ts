export interface IRule {
  rule: string
  water: string
  sewage: string
}

export interface ICategoryConversionRules {
  category: string,
  rules: Array<IRule>
}


export interface ITableContentDTO {
  lastUpdate: string
  categories: ICategoryConversionRules[]
}
