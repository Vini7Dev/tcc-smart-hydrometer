type MarkingRegion = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'CENTER'

export class ConsumptionMarking {
  public id: string

  public hydrometer_id: number

  public consumption: number

  public monetary_value: number

  public marking_region?: MarkingRegion

  public created_at: Date
}
