import { NewsImages } from './NewsImages'

export class News {
  public id: string

  public title: string

  public text: string

  public news_images: NewsImages[]

  public created_at: Date

  public updated_at: Date
}
