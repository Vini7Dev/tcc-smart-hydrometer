import { add } from 'date-fns'

type PeriodType = 'YESTERDAY' | 'PAST_MONTH' | 'PAST_YEAR' | 'CUSTOM'

interface IPeriodFilterBuilderProps {
  periodType?: PeriodType
  startDate?: string
  endDate?: string
}

const ONE_STEP_BEFORE = -1
const TWO_STEPS_BEFORE = -2
const HALF_OF_CUSTOM_PERIOD = 2

export const periodFilterBuilder = ({
  periodType = 'YESTERDAY',
  startDate,
  endDate,
}: IPeriodFilterBuilderProps) => {
  const nowIntervalDate = new Date()

  let middleIntervalDate: Date = nowIntervalDate
  let beforeIntervalDate: Date = nowIntervalDate
  let afterIntervalDate: Date = nowIntervalDate

  if (periodType === 'YESTERDAY') {
    middleIntervalDate = add(nowIntervalDate, { days: ONE_STEP_BEFORE })
    beforeIntervalDate = add(nowIntervalDate, { days: TWO_STEPS_BEFORE })
  } else if (periodType === 'PAST_MONTH') {
    middleIntervalDate = add(nowIntervalDate, { months: ONE_STEP_BEFORE })
    beforeIntervalDate = add(nowIntervalDate, { months: TWO_STEPS_BEFORE })
  } else if (periodType === 'PAST_YEAR') {
    middleIntervalDate = add(nowIntervalDate, { years: ONE_STEP_BEFORE })
    beforeIntervalDate = add(nowIntervalDate, { years: TWO_STEPS_BEFORE })
  } else if (periodType === 'CUSTOM' && startDate && endDate) {
    const startDateParsed = new Date(startDate)
    const endDateParsed = new Date(endDate)

    afterIntervalDate = endDateParsed
    middleIntervalDate = new Date((startDateParsed.getTime() + endDateParsed.getTime()) / HALF_OF_CUSTOM_PERIOD)
    beforeIntervalDate = startDateParsed
  }

  return {
    beforeDate: beforeIntervalDate,
    afterDate: afterIntervalDate,
    middleIntervalDate,
  }
}
