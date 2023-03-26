import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppRepository } from '@shared/infra/prisma/repositories/AppRepository'
import { User } from '../entities/User'

export class UsersRepository extends AppRepository implements IUsersRepository {
  public async findByEmail(email: string): Promise<User | null> {
    const findedUser = await this.client.users.findFirst({
      where: { email }
    })

    return findedUser
  }

  public async create({
    name,
    email,
    password,
    avatar_file,
    account_type,
  }: ICreateUserDTO): Promise<User> {
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
