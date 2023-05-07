import { injectable, inject } from 'tsyringe'

import { HTTP_STATUS_CODE } from '@utils/constants'
import { AppError } from '@shared/errors/AppError'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/models/IStorageProvider'

interface IUseCaseProps {
  authenticatedUserId: string
  id: string
}

const USER_NOT_FOUND_ERROR = 'User not found!'
const YOU_CANNOT_DELETE_ANOTHER_USER_ERROR = 'You cannot delete another user!'

@injectable()
export class DeleteCustomerUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    authenticatedUserId,
    id,
  }: IUseCaseProps) {
    const userToDelete = await this.usersRepository.findById(id)

    if (!userToDelete) {
      throw new AppError(USER_NOT_FOUND_ERROR, HTTP_STATUS_CODE.NOT_FOUND)
    }

    if (userToDelete.id !== authenticatedUserId) {
      throw new AppError(YOU_CANNOT_DELETE_ANOTHER_USER_ERROR, HTTP_STATUS_CODE.FORBIDDEN)
    }

    if (userToDelete.avatar_file) {
      await this.storageProvider.deleteFile(userToDelete.avatar_file)
    }

    await this.usersRepository.delete(id)
  }
}
