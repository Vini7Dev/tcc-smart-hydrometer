import { isAfter, isBefore } from 'date-fns'

import { ConsumptionMarking } from '@modules/consumptionMarkings/infra/prisma/entities/ConsumptionMarking'

interface IGroupConsumptionMarkingsByTimeDivisionProps {
  consumptionMarkings: ConsumptionMarking[]
  timeDivision: Date
}

export const groupConsumptionMarkingsByTimeDivision = (
  { consumptionMarkings, timeDivision }: IGroupConsumptionMarkingsByTimeDivisionProps
) => {
  const pastGroup= consumptionMarkings.filter(
    consumptionMarking => isBefore(consumptionMarking.created_at, timeDivision)
  )

  const presentGroup= consumptionMarkings.filter(
    consumptionMarking => isAfter(consumptionMarking.created_at, timeDivision)
  )

  return {
    pastGroup,
    presentGroup
  }
}
