import { injectable, inject } from 'tsyringe'

import { INewsRepository } from '@modules/news/repositories/INewsRepository'
import { AppError } from '@shared/errors/AppError'
import { HTTP_STATUS_CODE } from '@utils/constants'

interface IUseCaseProps {
  id: string
}

const NEWS_NOT_FOUND = 'News not found!'

@injectable()
export class DeleteNewsUseCase {
  constructor (
    @inject('NewsRepository')
    private newsRepository: INewsRepository
  ) {}

  public async execute({ id }: IUseCaseProps) {
    const newsToDelete = await this.newsRepository.findById(id)

    if (!newsToDelete) {
      throw new AppError(NEWS_NOT_FOUND, HTTP_STATUS_CODE.NOT_FOUND)
    }

    await this.newsRepository.delete(newsToDelete.id)
  }
}
