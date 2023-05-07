import { injectable, inject } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { HTTP_STATUS_CODE } from '@utils/constants'

interface IUseCaseProps {
  authenticatedUserId: string
}

const USER_NOT_FOUND_ERROR = 'User not found!'

@injectable()
export class GetProfileDataUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    authenticatedUserId,
  }: IUseCaseProps) {
    const profileData = await this.usersRepository.findById(authenticatedUserId)

    if (!profileData) {
      throw new AppError(USER_NOT_FOUND_ERROR, HTTP_STATUS_CODE.NOT_FOUND)
    }

    return profileData
  }
}
