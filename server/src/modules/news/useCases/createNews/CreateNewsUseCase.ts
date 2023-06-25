import { injectable, inject } from 'tsyringe'

import { INewsRepository } from '@modules/news/repositories/INewsRepository'
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/models/IStorageProvider'

interface IUseCaseProps {
  authenticatedUserId: string
  title: string
  text: string
  image_files: string[]
}

@injectable()
export class CreateNewsUseCase {
  constructor (
    @inject('NewsRepository')
    private newsRepository: INewsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    authenticatedUserId,
    title,
    text,
    image_files
  }: IUseCaseProps) {
    for (const imageFile of image_files) {
      await this.storageProvider.saveFile(imageFile)
    }

    const createdNews = await this.newsRepository.create({
      user_id: authenticatedUserId,
      title,
      text,
      image_files,
    })

    return createdNews
  }
}
