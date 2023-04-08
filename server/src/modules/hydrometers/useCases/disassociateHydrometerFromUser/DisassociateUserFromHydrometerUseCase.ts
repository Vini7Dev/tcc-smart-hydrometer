import { inject, injectable } from 'tsyringe'

import { IHydrometersRepository } from '@modules/hydrometers/repositories/IHydrometersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { HTTP_STATUS_CODE } from '@utils/constants';

interface IUseCaseProps {
  user_id: string
  hydrometer_id: number
}

const USER_NOT_FOUND_ERROR = 'User not found!'
const HYDROMETER_NOT_FOUND_ERROR = 'Hydrometer not found!'
const HYDROMETER_IS_ASSOCIATED_WITH_ANOTHER_USER = 'The hydrometer is associated with another user!'
const EMPTY_USER_ID_ASSOCIATION = null

@injectable()
export class DisassociateUserFromHydrometerUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HydrometersRepository')
    private hydrometersRepository: IHydrometersRepository,
  ) {}

  public async execute({
    user_id,
    hydrometer_id,
  }: IUseCaseProps) {
    const userToAssociate = await this.usersRepository.findById(user_id)

    if (!userToAssociate) {
      throw new AppError(USER_NOT_FOUND_ERROR, HTTP_STATUS_CODE.NOT_FOUND)
    }

    const hydrometerToAssociate = await this.hydrometersRepository.findById(
      hydrometer_id
    )

    if (!hydrometerToAssociate) {
      throw new AppError(HYDROMETER_NOT_FOUND_ERROR, HTTP_STATUS_CODE.NOT_FOUND)
    }

    if (hydrometerToAssociate.user_id !== userToAssociate.id) {
      throw new AppError(
        HYDROMETER_IS_ASSOCIATED_WITH_ANOTHER_USER,
        HTTP_STATUS_CODE.FORBIDDEN
      )
    }

    const updatedHydrometer = await this.hydrometersRepository.update({
      id: hydrometerToAssociate.id,
      user_id: EMPTY_USER_ID_ASSOCIATION,
    })

    return updatedHydrometer
  }
}
