export interface IRule {
  rule: string
  water: string
  sewage: string
}

export interface ICategoryConversionRulesDTO {
  category: string,
  rules: Array<IRule>
}
