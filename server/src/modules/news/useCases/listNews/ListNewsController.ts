import { HTTP_STATUS_CODE } from '@utils/constants'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListNewsUseCase } from './ListNewsUseCase'

export class ListNewsController {
  public async handle(_request: Request, response: Response) {
    const listNewsUseCase = container.resolve(ListNewsUseCase)

    const newsList = await listNewsUseCase.execute()

    return response
      .status(HTTP_STATUS_CODE.SUCCESS_DEFAULT)
      .json(newsList)
  }
}
