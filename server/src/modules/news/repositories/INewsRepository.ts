import { News } from '@prisma/client'
import { ICreateNewsDTO } from '../dtos/ICreateNewsDTO'
import { IListNewsDTO } from '../dtos/IListNewsDTO'

export interface INewsRepository {
  findById(id: string): Promise<News | null>
  list(filters: IListNewsDTO): Promise<News[]>
  create(data: ICreateNewsDTO): Promise<News>
}
