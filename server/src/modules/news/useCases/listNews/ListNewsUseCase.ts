import { injectable, inject } from 'tsyringe'

import { INewsRepository } from '@modules/news/repositories/INewsRepository'

@injectable()
export class ListNewsUseCase {
  constructor (
    @inject('NewsRepository')
    private newsRepository: INewsRepository
  ) {}

  public async execute() {
    const newsList = await this.newsRepository.list({})

    return newsList
  }
}
