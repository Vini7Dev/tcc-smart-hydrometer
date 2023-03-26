import { injectable, inject } from 'tsyringe'

import { ADMIN_ACCOUNT_TYPE } from '@utils/constants'
import { IUsersRepository } from '../repositories/IUsersRepository'

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
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    name,
    email,
    password,
    avatar_file,
  }: IUseCaseProps) {
    const createdUser = await this.usersRepository.create({
      name,
      email,
      password,
      avatar_file,
      account_type: ADMIN_ACCOUNT_TYPE
    })

    return createdUser
  }
}
