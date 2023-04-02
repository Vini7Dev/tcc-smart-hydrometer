import { News } from '@prisma/client'

export class NewsImages {
  public id: string

  public news_id: string

  public news: News

  public image_file: string

  public created_at: Date

  public updated_at: Date
}
