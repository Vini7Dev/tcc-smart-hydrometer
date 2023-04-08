import { HTTP_STATUS_CODE } from '@utils/constants'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateConsumptionMarkingUseCase } from './CreateConsumptionMarkingUseCase'

export class CreateConsumptionMarkingController {
  public async handle(request: Request, response: Response) {
    const { hydrometer_id, hydrometer_password, consumption } = request.body

    const createConsumptionMarkingUseCase = container.resolve(CreateConsumptionMarkingUseCase)

    const createdConsumptionMarking = await createConsumptionMarkingUseCase.execute({
      hydrometer_id,
      hydrometer_password,
      consumption,
    })

    return response
      .status(HTTP_STATUS_CODE.CREATED)
      .json(createdConsumptionMarking)
  }
}
