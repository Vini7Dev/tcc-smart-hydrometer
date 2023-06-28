import { ConsumptionMarking } from '@modules/consumptionMarkings/infra/prisma/entities/ConsumptionMarking'
import { differenceInDays, differenceInMonths, format } from 'date-fns'

interface IGroupConsumptionByDateProps {
  afterDate: Date
  beforeDate: Date
  consumptions: ConsumptionMarking[]
}

interface IGroupedConsumptionsProps {
  created_at_reference: Date
  date_group: string
  consumption: number
  monetary_value: number
}

const DATE_GROUP_FOTMATS = {
  perHour: 'yyyy-MM-dd HH:mm',
  perDate: 'yyyy-MM-dd',
  perWeekDay: 'yyyy-MM-iii',
  perMonth: 'yyyy-MM',
}

export const groupConsumptionByDate = ({
  afterDate,
  beforeDate,
  consumptions,
}: IGroupConsumptionByDateProps): IGroupedConsumptionsProps[] => {
  const totalOfMonthsBeetweenInterval = differenceInMonths(afterDate, beforeDate)
  const totalOfDaysBeetweenInterval = differenceInDays(afterDate, beforeDate)

  let dateGroupFormat = ''

  if (totalOfDaysBeetweenInterval < 3) {
    dateGroupFormat = DATE_GROUP_FOTMATS.perHour
  } else if (totalOfMonthsBeetweenInterval < 2) {
    dateGroupFormat = DATE_GROUP_FOTMATS.perDate
  } else if (totalOfMonthsBeetweenInterval < 6) {
    dateGroupFormat = DATE_GROUP_FOTMATS.perWeekDay
  } else {
    dateGroupFormat = DATE_GROUP_FOTMATS.perMonth
  }

  const groupedConsumptions: { [dateGroup: string]: IGroupedConsumptionsProps } = {}

  for (const consumption of consumptions) {
    const dateGroup = format(new Date(consumption.created_at), dateGroupFormat)

    const existingData = groupedConsumptions[dateGroup]

    if (existingData) {
      existingData.consumption += consumption.consumption
      existingData.monetary_value = Math.max(
        existingData.monetary_value,
        consumption.monetary_value
      )
    } else {
      groupedConsumptions[dateGroup] = {
        date_group: dateGroup,
        consumption: consumption.consumption,
        monetary_value: consumption.monetary_value,
        created_at_reference: consumption.created_at
      }
    }
  }

  return Object.values(groupedConsumptions)
}
