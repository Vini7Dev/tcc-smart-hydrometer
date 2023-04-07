import { HTTP_STATUS_CODE } from '@utils/constants'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GenerateHydrometerUseCase } from './GenerateHydrometerUseCase'

export class GenerateHydrometerController {
  public async handle(_request: Request, response: Response) {
    const generateHydrometerUseCase = container.resolve(GenerateHydrometerUseCase)

    const createdHydrometer = await generateHydrometerUseCase.execute()

    return response.json(createdHydrometer).status(HTTP_STATUS_CODE.CREATED)
  }
}
