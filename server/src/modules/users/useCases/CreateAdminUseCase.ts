import { injectable, inject } from 'tsyringe'

import { ADMIN_ACCOUNT_TYPE } from '@utils/constants'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { IHashProvider } from '@shared/containers/providers/HashProvider/models/IHashProvider'

interface IUseCaseProps {
  name: string
  email: string
  password: string
  avatar_file?: string
}

@injectable()
export class CreateAdminUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    avatar_file,
  }: IUseCaseProps) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('Email already exists!')
    }

    const passwordHash = await this.hashProvider.generateHash(password)

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      avatar_file,
      account_type: ADMIN_ACCOUNT_TYPE
    })

    return createdUser
  }
}
