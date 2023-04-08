import { inject, injectable } from 'tsyringe'

import { IQueue } from '@shared/containers/providers/Queue/models/IQueue'

@injectable()
export class ProcessQueueControl {
  private providers: object

  constructor (
    @inject('QueueProvider')
    private queueProvider: IQueue,
  ) {
    this.providers = {}
  }

  public async execute() {
    this.queueProvider.process({
      providers: this.providers,
    })
  }
}
