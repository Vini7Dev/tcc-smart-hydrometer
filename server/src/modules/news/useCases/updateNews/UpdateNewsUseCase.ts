import { injectable, inject } from 'tsyringe'

import { INewsRepository } from '@modules/news/repositories/INewsRepository'
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/models/IStorageProvider'
import { AppError } from '@shared/errors/AppError'
import { HTTP_STATUS_CODE } from '@utils/constants'

interface IUseCaseProps {
  id: string
  title?: string
  text?: string
  image_files?: string[]
  image_files_to_remove?: string[]
}

const NEWS_NOT_FOUND_ERROR = 'News not found!'

@injectable()
export class UpdateNewsUseCase {
  constructor (
    @inject('NewsRepository')
    private newsRepository: INewsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    id,
    title,
    text,
    image_files = [],
    image_files_to_remove = [],
  }: IUseCaseProps) {
    const newsToUpdate = await this.newsRepository.findById(id)

    if (!newsToUpdate) {
      throw new AppError(NEWS_NOT_FOUND_ERROR, HTTP_STATUS_CODE.NOT_FOUND)
    }

    for (const imageFile of image_files) {
      await this.storageProvider.saveFile(imageFile)
    }

    for (const imageFileToRemove of image_files_to_remove) {
      await this.storageProvider.deleteFile(imageFileToRemove)
    }

    const updatedNews = await this.newsRepository.update({
      id,
      title,
      text,
      image_files_to_add: image_files,
      image_files_to_remove,
    })

    return updatedNews
  }
}
