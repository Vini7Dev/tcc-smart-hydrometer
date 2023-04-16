import { inject, injectable } from 'tsyringe'

import { IQueueProvider } from '@shared/containers/providers/QueueProvider/models/IQueueProvider'

@injectable()
export class ProcessQueueControl {
  private providers: object

  constructor (
    @inject('QueueProvider')
    private queueProvider: IQueueProvider,
  ) {
    this.providers = {}
  }

  public async execute() {
    this.queueProvider.process({
      providers: this.providers,
    })
  }
}
