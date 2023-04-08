import { injectable, inject } from 'tsyringe'

import { HTTP_STATUS_CODE } from '@utils/constants'
import { IHashProvider } from '@shared/containers/providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'
import { IConsumptionMarkingsRepository } from '@modules/consumptionMarkings/repositories/IConsumptionMarkingsRepository'
import { IHydrometersRepository } from '@modules/hydrometers/repositories/IHydrometersRepository'

interface IUseCaseProps {
  hydrometer_id: number
  hydrometer_password: string
  consumption: number
}

const INVALID_CREDENTIALS_ERROR = 'Invalid credentials!'
const THE_HYDROMETER_IS_NOT_ACTIVATED = 'The hydrometer is not activated!'

@injectable()
export class CreateConsumptionMarkingUseCase {
  constructor (
    @inject('ConsumptionMarkingsRepository')
    private consumptionMarkingsRepository: IConsumptionMarkingsRepository,

    @inject('HydrometersRepository')
    private hydrometersRepository: IHydrometersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    hydrometer_id,
    hydrometer_password,
    consumption,
  }: IUseCaseProps) {
    const hydrometerToAssociate = await this.hydrometersRepository.findById(hydrometer_id)

    if (!hydrometerToAssociate) {
      throw new AppError(INVALID_CREDENTIALS_ERROR, HTTP_STATUS_CODE.UNAUTHORIZED)
    }

    const hydrometerPasswordMatch = await this.hashProvider.compareHash(
      hydrometer_password,
      hydrometerToAssociate.password
    )

    if (!hydrometerPasswordMatch) {
      throw new AppError(INVALID_CREDENTIALS_ERROR, HTTP_STATUS_CODE.UNAUTHORIZED)
    }

    if (!hydrometerToAssociate.user_id) {
      throw new AppError(THE_HYDROMETER_IS_NOT_ACTIVATED)
    }

    const createdConsumptionMarking = await this.consumptionMarkingsRepository.create({
      hydrometer_id: hydrometerToAssociate.id,
      consumption,
      monetary_value: 0
    })

    return createdConsumptionMarking
  }
}
