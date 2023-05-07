import { HTTP_STATUS_CODE } from '@utils/constants'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteNewsUseCase } from './DeleteNewsUseCase'

export class DeleteNewsController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteNewsUseCase = container.resolve(DeleteNewsUseCase)

    await deleteNewsUseCase.execute({ id })

    return response.status(HTTP_STATUS_CODE.NO_CONTENT).send()
  }
}
