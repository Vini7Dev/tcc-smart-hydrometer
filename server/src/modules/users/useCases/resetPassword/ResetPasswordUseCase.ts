import { injectable, inject } from 'tsyringe'

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { IForgotPasswordTokensRepository } from '@modules/users/repositories/IForgotPasswordTokensRepository'
import { AppError } from '@shared/errors/AppError'
import { HTTP_STATUS_CODE } from '@utils/constants'
import { IHashProvider } from '@shared/containers/providers/HashProvider/models/IHashProvider'

interface IUseCaseProps {
  token: string
  password: string
}

const INVALID_TOKEN_ERROR = 'Invalid forgot password token!'
const USER_NOT_FOUND_ERROR = 'User not found!'

@injectable()
export class ResetPasswordUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ForgotPasswordTokensRepository')
    private forgotPasswordTokensRepository: IForgotPasswordTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IUseCaseProps) {
    const forgotPasswordToken = await this.forgotPasswordTokensRepository.findById(token)

    if (!forgotPasswordToken) {
      throw new AppError(INVALID_TOKEN_ERROR, HTTP_STATUS_CODE.UNAUTHORIZED)
    }

    const userToResetPassword = await this.usersRepository.findById(
      forgotPasswordToken.user_id
    )

    if (!userToResetPassword) {
      throw new AppError(USER_NOT_FOUND_ERROR, HTTP_STATUS_CODE.NOT_FOUND)
    }

    const passwordHash = await this.hashProvider.generateHash(password)

    const updatedUser = await this.usersRepository.update({
      id: userToResetPassword.id,
      password: passwordHash,
    })

    await this.forgotPasswordTokensRepository.delete(token)

    return updatedUser
  }
}
