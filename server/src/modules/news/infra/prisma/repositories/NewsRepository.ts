import { ICreateNewsDTO } from '@modules/news/dtos/ICreateNewsDTO'
import { INewsRepository } from '@modules/news/repositories/INewsRepository'
import { News } from '@prisma/client'
import { AppRepository } from '@shared/infra/prisma/repositories/AppRepository'

export class NewsRepository extends AppRepository implements INewsRepository {
  public async create({
    title,
    text,
    image_files
  }: ICreateNewsDTO): Promise<News> {
    const createdNews = await this.client.news.create({
      data: {
        title,
        text,
        news_images: {
          createMany: {
            data: image_files.map(image_file => ({ image_file }))
          }
        }
      }
    })

    return createdNews
  }
}
