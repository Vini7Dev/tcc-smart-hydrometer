import { inject, injectable } from 'tsyringe'

import { IHydrometersRepository } from '@modules/hydrometers/repositories/IHydrometersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { HTTP_STATUS_CODE } from '@utils/constants'

type ConsumptionCategory = 'EMPTY'
  | 'COMMERCIAL_SOCIAL_ASSISTANCE'
  | 'COMMERCIAL_NORMAL'
  | 'INDUSTRIAL_NORMAL'
  | 'PUBLIC_WITH_PROGRAM_AGREEMENT'
  | 'PUBLIC_WITH_CONTRACT_PURE'
  | 'PUBLIC_NORMAL'
  | 'RESIDENTIAL_NORMAL'
  | 'RESIDENTIAL_SOCIAL'
  | 'RESIDENTIAL_VULNERABLE_NORMAL'

interface IUseCaseProps {
  id: number
  user_id: string
  name: string
  share_consumption?: boolean
  consumption_category?: ConsumptionCategory
  address?: {
    postal_code: string
    street: string
    number?: string
    neighborhood: string
    city: string
    state: string
  }
}

const USER_NOT_FOUND_ERROR = 'User not found!'
const INVALID_CREDENTIALS_ERROR = 'Invalid credentials!'
const HYDROMETER_IS_ASSOCIATED_WITH_ANOTHER_USER = 'The hydrometer is associated with another user!'

@injectable()
export class UpdateUserHydrometerUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HydrometersRepository')
    private hydrometersRepository: IHydrometersRepository,
  ) {}

  public async execute({
    id,
    user_id,
    name,
    share_consumption,
    consumption_category,
    address,
  }: IUseCaseProps) {
    const userOfAssociation = await this.usersRepository.findById(user_id)

    if (!userOfAssociation) {
      throw new AppError(USER_NOT_FOUND_ERROR, HTTP_STATUS_CODE.NOT_FOUND)
    }

    const hydrometerToUpdate = await this.hydrometersRepository.findById(id)

    if (!hydrometerToUpdate) {
      throw new AppError(INVALID_CREDENTIALS_ERROR, HTTP_STATUS_CODE.UNAUTHORIZED)
    }

    if (hydrometerToUpdate.user_id && hydrometerToUpdate.user_id !== userOfAssociation.id) {
      throw new AppError(HYDROMETER_IS_ASSOCIATED_WITH_ANOTHER_USER, HTTP_STATUS_CODE.FORBIDDEN)
    }

    const updatedHydrometer = await this.hydrometersRepository.update({
      id: hydrometerToUpdate.id,
      user_id,
      name: name,
      share_consumption,
      consumption_category,
      address,
    })

    return updatedHydrometer
  }
}
