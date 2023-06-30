type MarkingRegion = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'CENTER'

export interface ICreateConsumptionMarkingDTO {
  hydrometer_id: number
  consumption: number
  monetary_value: number
  marking_region?: MarkingRegion
}
