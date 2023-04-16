import { inject, injectable } from 'tsyringe'

import { IQueueProvider } from '@shared/containers/providers/QueueProvider/models/IQueueProvider'
import { ICrawlerProvider } from '@shared/containers/providers/CrawlerProvider/models/ICrawlerProvider'
import { ICitiesForConversionRepository } from '@modules/citiesForConversion/repositories/ICitiesForConversionRepository'

@injectable()
export class ProcessQueueControl {
  private providers: object

  constructor (
    @inject('QueueProvider')
    private queueProvider: IQueueProvider,

    @inject('CrawlerProvider')
    crawlerProvider: ICrawlerProvider,

    @inject('CitiesForConversionRepository')
    citiesForConversionRepository: ICitiesForConversionRepository,
  ) {
    this.providers = {
      crawlerProvider,
      citiesForConversionRepository,
    }
  }

  public async execute() {
    this.queueProvider.process({
      providers: this.providers,
    })
  }
}
