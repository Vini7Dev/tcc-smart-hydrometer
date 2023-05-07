import { injectable, inject } from 'tsyringe'

import { HTTP_STATUS_CODE } from '@utils/constants'
import { IHashProvider } from '@shared/containers/providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/models/IStorageProvider'

interface IUseCaseProps {
  authenticatedUserId: string
  id: string
  name?: string
  email?: string
  password?: string
  avatarFileName?: string
}

const USER_NOT_FOUND_ERROR = 'User not found!'
const EMAIL_ALREADY_EXISTS_ERROR = 'Email already exists!'
const YOU_CANNOT_UPDATE_ANOTHER_USER_ERROR = 'You cannot update another user'

@injectable()
export class UpdateCustomerUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    authenticatedUserId,
    id,
    name,
    email,
    password,
    avatarFileName,
  }: IUseCaseProps) {
    const userToUpdate = await this.usersRepository.findById(id)

    if (!userToUpdate) {
      throw new AppError(USER_NOT_FOUND_ERROR, HTTP_STATUS_CODE.NOT_FOUND)
    }

    if (userToUpdate.id !== authenticatedUserId) {
      throw new AppError(YOU_CANNOT_UPDATE_ANOTHER_USER_ERROR, HTTP_STATUS_CODE.FORBIDDEN)
    }

    if (email) {
      const userWithSameEmail = await this.usersRepository.findByEmail(email)

      if (userWithSameEmail && userWithSameEmail.id !== userToUpdate.id) {
        throw new AppError(EMAIL_ALREADY_EXISTS_ERROR)
      }
    }

    if (avatarFileName) {
      if (userToUpdate.avatar_file) {
        await this.storageProvider.deleteFile(userToUpdate.avatar_file)
      }

      await this.storageProvider.saveFile(avatarFileName)
    }

    let newPasswordHash

    if (password) {
      newPasswordHash = await this.hashProvider.generateHash(password)
    }

    const createdUser = await this.usersRepository.update({
      id,
      name,
      email,
      password: newPasswordHash,
      avatar_file: avatarFileName
    })

    return createdUser
  }
}
