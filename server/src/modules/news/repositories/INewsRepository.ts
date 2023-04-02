import { News } from '@prisma/client'
import { ICreateNewsDTO } from '../dtos/ICreateNewsDTO'

export interface INewsRepository {
  create(data: ICreateNewsDTO): Promise<News>
}
