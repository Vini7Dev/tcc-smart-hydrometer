import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { IHashProvider } from '@shared/containers/providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'
import { HTTP_STATUS_CODE } from '@utils/constants'
import { authConfig } from '@configs/auth'

interface IUseCaseProps {
  email: string
  password: string
}

const INVALID_CREDENTIALS_ERROR = 'Invalid credentials!'

@injectable()
export class AuthenticateUserUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async handle({ email, password }: IUseCaseProps) {
    const findedUser = await this.usersRepository.findByEmail(email)

    if (!findedUser) {
      throw new AppError(INVALID_CREDENTIALS_ERROR, HTTP_STATUS_CODE.UNAUTHORIZED)
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      findedUser.password,
    )

    if (!passwordMatch) {
      throw new AppError(INVALID_CREDENTIALS_ERROR, HTTP_STATUS_CODE.UNAUTHORIZED)
    }

    const { secret, expiresIn } = authConfig.token

    const token = sign({}, secret, {
      subject: findedUser.id,
      expiresIn: expiresIn,
  })

    return {
      user: {
        name: findedUser.name,
        email: findedUser.email,
      },
      token
    }
  }
}
