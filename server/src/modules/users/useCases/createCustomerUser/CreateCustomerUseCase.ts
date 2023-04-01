import { injectable, inject } from 'tsyringe'

import { CUSTOMER_ACCOUNT_TYPE } from '@utils/constants'
import { IHashProvider } from '@shared/containers/providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/models/IStorageProvider'

interface IUseCaseProps {
  name: string
  email: string
  password: string
  avatarFileName?: string
}

const EMAIL_ALREADY_EXISTS_ERROR = 'Email already exists!'

@injectable()
export class CreateCustomerUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    name,
    email,
    password,
    avatarFileName,
  }: IUseCaseProps) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new AppError(EMAIL_ALREADY_EXISTS_ERROR)
    }

    if (avatarFileName) {
      await this.storageProvider.saveFile(avatarFileName)
    }

    const passwordHash = await this.hashProvider.generateHash(password)

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      account_type: CUSTOMER_ACCOUNT_TYPE,
      avatar_file: avatarFileName
    })

    return createdUser
  }
}
