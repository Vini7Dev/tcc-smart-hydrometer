import { ConsumptionMarking } from '@modules/consumptionMarkings/infra/prisma/entities/ConsumptionMarking'

export const calculateConsumptionTotalsByRegion = (
  consumptionMarkings: ConsumptionMarking[]
) => {
  const totals = {
    NORTH: { consumption: 0, monetary_value: 0 },
    SOUTH: { consumption: 0, monetary_value: 0 },
    EAST: { consumption: 0, monetary_value: 0 },
    WEST: { consumption: 0, monetary_value: 0 },
    CENTER: { consumption: 0, monetary_value: 0 },
  }

  for (const consumptionMarking of consumptionMarkings) {
    switch (consumptionMarking.marking_region) {
      case 'NORTH':
        totals.NORTH.consumption += consumptionMarking.consumption
        totals.NORTH.monetary_value = Math.max(
          totals.NORTH.monetary_value,
          consumptionMarking.monetary_value,
        )
        break
      case 'SOUTH':
        totals.SOUTH.consumption += consumptionMarking.consumption
        totals.SOUTH.monetary_value = Math.max(
          totals.SOUTH.monetary_value,
          consumptionMarking.monetary_value,
        )
        break
      case 'EAST':
        totals.EAST.consumption += consumptionMarking.consumption
        totals.EAST.monetary_value = Math.max(
          totals.EAST.monetary_value,
          consumptionMarking.monetary_value,
        )
        break
      case 'WEST':
        totals.WEST.consumption += consumptionMarking.consumption
        totals.WEST.monetary_value = Math.max(
          totals.WEST.monetary_value,
          consumptionMarking.monetary_value,
        )
        break
      case 'CENTER':
        totals.CENTER.consumption += consumptionMarking.consumption
        totals.CENTER.monetary_value = Math.max(
          totals.CENTER.monetary_value,
          consumptionMarking.monetary_value,
        )
        break
    }
  }

  return totals
}
