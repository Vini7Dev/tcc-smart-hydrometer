import { inject, injectable } from 'tsyringe'

import { IHydrometersRepository } from '@modules/hydrometers/repositories/IHydrometersRepository'
import { IHashProvider } from '@shared/containers/providers/HashProvider/models/IHashProvider'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { HTTP_STATUS_CODE } from '@utils/constants'

interface IUseCaseProps {
  id: number
  password: string
  user_id: string
}

const USER_NOT_FOUND_ERROR = 'User not found!'
const INVALID_CREDENTIALS_ERROR = 'Invalid credentials!'
const HYDROMETER_IS_ASSOCIATED_WITH_ANOTHER_USER = 'The hydrometer is associated with another user!'

@injectable()
export class AssociateHydrometerToUserUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HydrometersRepository')
    private hydrometersRepository: IHydrometersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    password,
    user_id,
  }: IUseCaseProps) {
    const userToAssociate = await this.usersRepository.findById(user_id)

    if (!userToAssociate) {
      throw new AppError(USER_NOT_FOUND_ERROR, HTTP_STATUS_CODE.NOT_FOUND)
    }

    const hydrometerToAssociate = await this.hydrometersRepository.findById(id)

    if (!hydrometerToAssociate) {
      throw new AppError(INVALID_CREDENTIALS_ERROR, HTTP_STATUS_CODE.UNAUTHORIZED)
    }

    if (hydrometerToAssociate.user_id && hydrometerToAssociate.user_id !== userToAssociate.id) {
      throw new AppError(HYDROMETER_IS_ASSOCIATED_WITH_ANOTHER_USER, HTTP_STATUS_CODE.FORBIDDEN)
    }

    const hydrometerPasswordMatch = await this.hashProvider.compareHash(
      password,
      hydrometerToAssociate.password
    )

    if (!hydrometerPasswordMatch) {
      throw new AppError(INVALID_CREDENTIALS_ERROR, HTTP_STATUS_CODE.UNAUTHORIZED)
    }

    const updatedHydrometer = await this.hydrometersRepository.update({
      id: hydrometerToAssociate.id,
      user_id,
    })

    return updatedHydrometer
  }
}
