import { News } from '@prisma/client'
import { ICreateNewsDTO } from '../dtos/ICreateNewsDTO'
import { IListNewsDTO } from '../dtos/IListNewsDTO'

export interface INewsRepository {
  list(filters: IListNewsDTO): Promise<News[]>
  create(data: ICreateNewsDTO): Promise<News>
}
