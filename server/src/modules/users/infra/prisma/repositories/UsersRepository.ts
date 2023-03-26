import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppRepository } from '@shared/infra/prisma/repositories/AppRepository'

export class UsersRepository extends AppRepository implements IUsersRepository {
  public async create({
    name,
    email,
    password,
    avatar_file,
    account_type,
  }: ICreateUserDTO) {
    const createdUser = await this.client.users.create({
      data: {
        name,
        email,
        password,
        avatar_file,
        account_type,
      }
    })

    return createdUser
  }
}
