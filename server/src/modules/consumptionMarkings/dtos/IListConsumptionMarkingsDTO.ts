type MarkingRegion = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'CENTER'

export interface IListConsumptionMarkingsDTO {
  hydrometer_id?: number
  marking_region?: MarkingRegion
  share_consumption?: boolean
  before_date?: Date
  after_date?: Date
  page?: number
  perPage?: number
}
