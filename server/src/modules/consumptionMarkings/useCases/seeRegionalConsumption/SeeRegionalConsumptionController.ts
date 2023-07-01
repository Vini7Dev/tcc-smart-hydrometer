import { HTTP_STATUS_CODE } from '@utils/constants'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { SeeRegionalConsumptionUseCase } from './SeeRegionalConsumptionUseCase'

export class SeeRegionalConsumptionController {
  public async handle(request: Request, response: Response) {
    const {
      marking_region,
      period_type,
      start_date,
      end_date
    } = request.query as any

    const seeRegionalConsumptionUseCase = container.resolve(SeeRegionalConsumptionUseCase)

    const consumptionMarkingList = await seeRegionalConsumptionUseCase.execute({
      marking_region,
      period_type,
      start_date,
      end_date,
    })

    return response
      .status(HTTP_STATUS_CODE.SUCCESS_DEFAULT)
      .json(consumptionMarkingList)
  }
}
