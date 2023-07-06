import { inject, injectable } from 'tsyringe'

import { IQueueProvider } from '@shared/containers/providers/QueueProvider/models/IQueueProvider'
import { JOB_UPDATE_CONSUPTION_CONVERSIONS } from '@utils/constants'

@injectable()
export class StartJobUpdateConsumptionConversionsService {
  constructor(
    @inject('QueueProvider')
    private queueProvider: IQueueProvider,
  ) {}

  public async execute() {
    await this.queueProvider.add({
      name: JOB_UPDATE_CONSUPTION_CONVERSIONS,
      data: {},
    })
  }
}
