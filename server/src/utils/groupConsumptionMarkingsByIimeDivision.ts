import { isAfter, isBefore } from 'date-fns'

import { ConsumptionMarkings } from '@modules/consumptionMarkings/infra/prisma/entities/ConsumptionMarkings'

interface IGroupConsumptionMarkingsByTimeDivisionProps {
  consumptionMarkings: ConsumptionMarkings[]
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
