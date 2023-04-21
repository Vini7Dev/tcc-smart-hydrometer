import { HTTP_STATUS_CODE } from '@utils/constants'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { SeePersonalConsumptionUseCase } from './SeePersonalConsumptionUseCase'

export class SeePersonalConsumptionController {
  public async handle(request: Request, response: Response) {
    const { id: user_id } = request.user

    const {
      hydrometer_id,
      period_type,
      start_date,
      end_date
    } = request.query as any

    const seePersonalConsumptionUseCase = container.resolve(SeePersonalConsumptionUseCase)

    const consumptionMarkingList = await seePersonalConsumptionUseCase.execute({
      hydrometer_id: Number(hydrometer_id ?? -1),
      user_id,
      period_type,
      start_date,
      end_date,
    })

    return response
      .status(HTTP_STATUS_CODE.SUCCESS_DEFAULT)
      .json(consumptionMarkingList)
  }
}
