import { User } from '@modules/users/infra/prisma/entities/User'
import { NewsImages } from './NewsImages'

export class News {
  public id: string

  public user_id?: string

  public title: string

  public text: string

  public news_images: NewsImages[]

  public author?: User

  public created_at: Date

  public updated_at: Date
}
