import Bull, { Queue } from 'bull'

import * as Jobs from '@jobs/index'
import { redisConfig } from '@configs/redis'
import { AppError } from '@shared/errors/AppError'
import { IQueueProvider, IAddQueueProps, IProcessProps } from '../models/IQueueProvider'

export interface IHandleProps {
  providers: object
  data: object
}

interface IQueueControlAdd {
  bull: Queue
  name: string
  handle: (props: any) => Promise<any>
}

export class BullProvider implements IQueueProvider {
  private queues: IQueueControlAdd[]

  constructor() {
    this.queues = Object.values(Jobs).map(job => ({
      bull: new Bull(job.key, {
        redis: redisConfig,
      }),
      name: job.key,
      handle: job.handle,
    }))
  }

  public async add({ name, data }: IAddQueueProps): Promise<void> {
    const queueToAdd = this.queues.find(queue => queue.name === name)

    if(!queueToAdd) {
      throw new AppError('Queue not found!', 404)
    }

    queueToAdd.bull.add(data)
  }

  public process({ providers }: IProcessProps): void {
    this.queues.forEach(queue => {
      queue.bull.process(async job => {
        await queue.handle({
          providers,
          data: job.data
        })
      })

      queue.bull.on('failed', (job, err) => {
        console.log(`===> Job Failed: ${queue.name} | Job Data: ${
          JSON.stringify(job.data, null, 2)
        }`)
        console.error(err)
      })
    })
  }

  public getQueues(): IQueueControlAdd[] {
    return this.queues
  }
}
