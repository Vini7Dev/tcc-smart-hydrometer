import { injectable, inject } from 'tsyringe'

import { IConsumptionMarkingsRepository } from '@modules/consumptionMarkings/repositories/IConsumptionMarkingsRepository'
import { groupConsumptionMarkingsByTimeDivision } from '@utils/groupConsumptionMarkingsByIimeDivision'
import { periodFilterBuilder } from '@utils/periodFilterBuilder'

type PeriodType = 'YESTERDAY' | 'PAST_MONTH' | 'PAST_YEAR' | 'CUSTOM'

interface IUseCaseProps {
  region: string
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
    region,
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
      region,
      share_consumption: HYDROMETER_HAS_SHARE_CONSUMPTION,
      before_date: beforeDate,
      after_date: afterDate,
    })

    const groupsOfConsumptionMarkings = groupConsumptionMarkingsByTimeDivision({
      consumptionMarkings: consumptionMarkingList,
      timeDivision: middleIntervalDate,
    })

    return groupsOfConsumptionMarkings
  }
}
