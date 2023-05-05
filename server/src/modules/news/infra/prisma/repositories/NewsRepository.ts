import { ICreateNewsDTO } from '@modules/news/dtos/ICreateNewsDTO'
import { IListNewsDTO } from '@modules/news/dtos/IListNewsDTO'
import { IUpdateNewsDTO } from '@modules/news/dtos/IUpdateNewsDTO'
import { INewsRepository } from '@modules/news/repositories/INewsRepository'
import { News } from '@prisma/client'
import { AppRepository } from '@shared/infra/prisma/repositories/AppRepository'

const LIST_FIRST_PAGE = 0
const LIST_DEFAULT_PER_PAGE = 5

export class NewsRepository extends AppRepository implements INewsRepository {
  public async findById(id: string): Promise<News | null> {
    const findedNews = await this.client.news.findFirst({
      where: { id },
      include: {
        news_images: true
      }
    })

    return findedNews
  }

  public async list({
    page = LIST_FIRST_PAGE,
    perPage = LIST_DEFAULT_PER_PAGE,
  }: IListNewsDTO): Promise<News[]> {
    const newsList = await this.client.news.findMany({
      skip: page,
      take: perPage,
      include: {
        news_images: true
      }
    })

    return newsList
  }

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

  public async update({
    id,
    title,
    text,
    image_files_to_add = [],
    image_files_to_remove = [],
  }: IUpdateNewsDTO): Promise<News> {
    const createdNews = await this.client.news.update({
      where: { id },
      data: {
        title,
        text,
        news_images: {
          createMany: {
            data: image_files_to_add.map(image_file => ({ image_file }))
          },
          deleteMany: image_files_to_remove.map(image_file => ({ image_file }))
        },
      }
    })

    return createdNews
  }
}
