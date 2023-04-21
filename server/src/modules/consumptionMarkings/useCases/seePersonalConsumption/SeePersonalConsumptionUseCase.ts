import { injectable, inject } from 'tsyringe'
import { add } from 'date-fns'

import { IConsumptionMarkingsRepository } from '@modules/consumptionMarkings/repositories/IConsumptionMarkingsRepository'
import { IHydrometersRepository } from '@modules/hydrometers/repositories/IHydrometersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { HTTP_STATUS_CODE } from '@utils/constants'
import { groupConsumptionMarkingsByTimeDivision } from '@utils/groupConsumptionMarkingsByIimeDivision'
import { periodFilterBuilder } from '@utils/periodFilterBuilder'

type PeriodType = 'YESTERDAY' | 'PAST_MONTH' | 'PAST_YEAR' | 'CUSTOM'

interface IUseCaseProps {
  hydrometer_id: number
  user_id: string
  period_type?: PeriodType
  start_date?: string
  end_date?: string
}

const USER_NOT_FOUND_ERROR = 'User not found!'
const HYDROMETER_NOT_FOUND_ERROR = 'Hydrometer not found!'
const WITHOUT_PERMISSION_TO_ACCESS_THIS_HYDROMETER_MARKINGS = 'You have no permission to access this hydrometer markings!'

@injectable()
export class SeePersonalConsumptionUseCase {
  constructor (
    @inject('ConsumptionMarkingsRepository')
    private consumptionMarkingsRepository: IConsumptionMarkingsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HydrometersRepository')
    private hydrometersRepository: IHydrometersRepository,
  ) {}

  public async execute({
    hydrometer_id,
    user_id,
    period_type,
    start_date,
    end_date,
  }: IUseCaseProps) {
    const userToAssociate = await this.usersRepository.findById(user_id)

    if (!userToAssociate) {
      throw new AppError(USER_NOT_FOUND_ERROR, HTTP_STATUS_CODE.NOT_FOUND)
    }

    const hydrometerToAssociate = await this.hydrometersRepository.findById(hydrometer_id)

    if (!hydrometerToAssociate) {
      throw new AppError(HYDROMETER_NOT_FOUND_ERROR, HTTP_STATUS_CODE.NOT_FOUND)
    }

    if (hydrometerToAssociate.user_id !== userToAssociate.id) {
      throw new AppError(
        WITHOUT_PERMISSION_TO_ACCESS_THIS_HYDROMETER_MARKINGS,
        HTTP_STATUS_CODE.FORBIDDEN
      )
    }

    const { afterDate, beforeDate, middleIntervalDate } = periodFilterBuilder({
      periodType: period_type,
      startDate: start_date,
      endDate: end_date,
    })

    const consumptionMarkingList = await this.consumptionMarkingsRepository.list({
      hydrometer_id,
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
