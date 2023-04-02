import { HTTP_STATUS_CODE } from '@utils/constants'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { SeeNewsUseCase } from './SeeNewsUseCase'

export class SeeNewsController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params

    const seeNewsUseCase = container.resolve(SeeNewsUseCase)

    const newsData = await seeNewsUseCase.execute({ id })

    return response
      .status(HTTP_STATUS_CODE.SUCCESS_DEFAULT)
      .json(newsData)
  }
}
