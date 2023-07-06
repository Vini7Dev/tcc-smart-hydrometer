import { inject, injectable } from 'tsyringe'

import { IHydrometersRepository } from '@modules/hydrometers/repositories/IHydrometersRepository'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { HTTP_STATUS_CODE } from '@utils/constants'

interface IUseCaseProps {
  user_id: string
}

const USER_NOT_FOUND_ERROR = 'User not found!'

@injectable()
export class ListUserHydrometersUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HydrometersRepository')
    private hydrometersRepository: IHydrometersRepository,
  ) {}

  public async execute({
    user_id,
  }: IUseCaseProps) {
    const userToAssociate = await this.usersRepository.findById(user_id)

    if (!userToAssociate) {
      throw new AppError(USER_NOT_FOUND_ERROR, HTTP_STATUS_CODE.NOT_FOUND)
    }

    const userHydrometerList = await this.hydrometersRepository.list({ user_id })

    return userHydrometerList
  }
}
