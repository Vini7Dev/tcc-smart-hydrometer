import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IListUsersDTO } from '@modules/users/dtos/IListUsersDTO'
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { AppRepository } from '@shared/infra/prisma/repositories/AppRepository'
import { buildRepositoryFiltersObject } from '@utils/buildRepositoryFiltersObject'
import { User } from '../entities/User'

const LIST_FIRST_PAGE = 0
const LIST_DEFAULT_PER_PAGE = 50

export class UsersRepository extends AppRepository implements IUsersRepository {
  public async findById(id: string): Promise<User | null> {
    const findedUser = await this.client.users.findFirst({
      where: { id }
    })

    return findedUser
  }

  public async findByEmail(email: string): Promise<User | null> {
    const findedUser = await this.client.users.findFirst({
      where: { email }
    })

    return findedUser
  }

  public async list({
    page = LIST_FIRST_PAGE,
    perPage = LIST_DEFAULT_PER_PAGE,
    account_type,
  }: IListUsersDTO): Promise<User[]> {
    const filteredUsers = await this.client.users.findMany({
      skip: page,
      take: perPage,
      where: {
        AND: {
          ...buildRepositoryFiltersObject({ account_type })
        }
      },
    })

    return filteredUsers
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

  public async update({
    id,
    name,
    email,
    password,
    avatar_file,
  }: IUpdateUserDTO): Promise<User> {
    const updatedUser = await this.client.users.update({
      data: {
        name,
        email,
        password,
        avatar_file,
        updated_at: new Date()
      },
      where: { id }
    })

    return updatedUser
  }
}
