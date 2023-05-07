import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { HTTP_STATUS_CODE } from '@utils/constants'
import { DeleteAdminUseCase } from './DeleteAdminUseCase'

export class DeleteAdminController {
  public async handle(request: Request, response: Response) {
    const { id: authenticatedUserId } = request.user

    const { id } = request.params

    const deleteAdminUseCase = container.resolve(DeleteAdminUseCase)

    await deleteAdminUseCase.execute({
      authenticatedUserId,
      id,
    })

    return response.status(HTTP_STATUS_CODE.NO_CONTENT).send()
  }
}
