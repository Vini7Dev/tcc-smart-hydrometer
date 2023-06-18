import { ConsumptionMarking } from '@modules/consumptionMarkings/infra/prisma/entities/ConsumptionMarking'

export const groupConsumptionByDate = (consumptions: ConsumptionMarking[]): ConsumptionMarking[] => {
  const groupedData: { [date: string]: ConsumptionMarking } = {}

  for (const consumption of consumptions) {
    const date = new Date(consumption.created_at).toISOString().split('T')[0]
    const existingData = groupedData[date]

    if (existingData) {
      existingData.consumption += consumption.consumption
      existingData.monetary_value = Math.max(
        existingData.monetary_value,
        consumption.monetary_value
      )
    } else {
      groupedData[date] = { ...consumption }
    }
  }

  return Object.values(groupedData)
}
