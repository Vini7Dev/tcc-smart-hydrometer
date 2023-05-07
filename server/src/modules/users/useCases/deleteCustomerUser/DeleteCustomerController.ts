import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { HTTP_STATUS_CODE } from '@utils/constants'
import { DeleteCustomerUseCase } from './DeleteCustomerUseCase'

export class DeleteCustomerController {
  public async handle(request: Request, response: Response) {
    const { id: authenticatedUserId } = request.user

    const { id } = request.params

    const deleteCustomerUseCase = container.resolve(DeleteCustomerUseCase)

    await deleteCustomerUseCase.execute({
      authenticatedUserId,
      id,
    })

    return response.status(HTTP_STATUS_CODE.NO_CONTENT).send()
  }
}
