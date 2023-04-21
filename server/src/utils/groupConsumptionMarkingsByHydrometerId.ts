import { ConsumptionMarking } from '@modules/consumptionMarkings/infra/prisma/entities/ConsumptionMarking'

interface IGroupConsumptionMarkingsByHydrometerIdProps {
  consumptionMarkingList: ConsumptionMarking[]
}

export const groupConsumptionMarkingsByHydrometerId = (
  { consumptionMarkingList }: IGroupConsumptionMarkingsByHydrometerIdProps
) => {
  const consumptionMarkingGroups: { [key: number]: ConsumptionMarking[] } = {}

  consumptionMarkingList.forEach((consumptionMarking) => {
    const hydrometerId = consumptionMarking.hydrometer_id

    if (consumptionMarkingGroups[hydrometerId]) {
      consumptionMarkingGroups[hydrometerId].push(consumptionMarking)
    } else {
      consumptionMarkingGroups[hydrometerId] = [consumptionMarking]
    }
  })

  return consumptionMarkingGroups
}
