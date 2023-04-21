export interface IListConsumptionMarkingsDTO {
  hydrometer_id?: number
  region?: string
  share_consumption?: boolean
  before_date?: Date
  after_date?: Date
  page?: number
  perPage?: number
}
