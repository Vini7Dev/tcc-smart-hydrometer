import { injectable, inject } from 'tsyringe'

import { IConsumptionMarkingsRepository } from '@modules/consumptionMarkings/repositories/IConsumptionMarkingsRepository'
import { groupConsumptionMarkingsByTimeDivision } from '@utils/groupConsumptionMarkingsByIimeDivision'
import { periodFilterBuilder } from '@utils/periodFilterBuilder'
import { groupConsumptionByDate } from '@utils/groupConsumptionByDate'
import { calculateConsumptionTotalsByRegion } from '@utils/calculateConsumptionTotalsByRegion'

type PeriodType = 'YESTERDAY' | 'PAST_MONTH' | 'PAST_YEAR' | 'CUSTOM'

type MarkingRegion = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'CENTER'

interface IUseCaseProps {
  marking_region?: MarkingRegion
  period_type?: PeriodType
  start_date?: string
  end_date?: string
}

const HYDROMETER_HAS_SHARE_CONSUMPTION = true

@injectable()
export class SeeRegionalConsumptionUseCase {
  constructor (
    @inject('ConsumptionMarkingsRepository')
    private consumptionMarkingsRepository: IConsumptionMarkingsRepository,
  ) {}

  public async execute({
    marking_region,
    period_type,
    start_date,
    end_date,
  }: IUseCaseProps) {
    const { afterDate, beforeDate, middleIntervalDate } = periodFilterBuilder({
      periodType: period_type,
      startDate: start_date,
      endDate: end_date,
    })

    const consumptionMarkingList = await this.consumptionMarkingsRepository.list({
      marking_region,
      share_consumption: HYDROMETER_HAS_SHARE_CONSUMPTION,
      before_date: beforeDate,
      after_date: afterDate,
    })

    const groupsOfConsumptionMarkings = groupConsumptionMarkingsByTimeDivision({
      consumptionMarkings: consumptionMarkingList,
      timeDivision: middleIntervalDate,
    })

    const groupedConsumptionMarkings = {
      pastGroup: groupConsumptionByDate({
        afterDate,
        beforeDate,
        consumptions: groupsOfConsumptionMarkings.pastGroup,
      }),
      presentGroup: groupConsumptionByDate({
        afterDate,
        beforeDate,
        consumptions: groupsOfConsumptionMarkings.presentGroup,
      }),
    }

    const presentTotals = calculateConsumptionTotalsByRegion(
      groupsOfConsumptionMarkings.presentGroup
    )

    const pastTotals = calculateConsumptionTotalsByRegion(
      groupsOfConsumptionMarkings.pastGroup
    )

    return {
      ...groupedConsumptionMarkings,
      presentTotals,
      pastTotals,
    }
  }
}
