import { HTTP_STATUS_CODE } from '@utils/constants'
import { removeObjectAttributes } from '@utils/removeObjectAttributes'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateCustomerUseCase } from './UpdateCustomerUseCase'

const PASSWORD_ATTRIBUTE_TO_REMOVE = 'password'

export class UpdateCustomerController {
  public async handle(request: Request, response: Response) {
    const { id: authenticatedUserId } = request.user

    const { id } = request.params

    const { name, email, password } = request.body

    const avatarFileName = request.file?.filename

    const updateCustomerUseCase = container.resolve(UpdateCustomerUseCase)

    const updatedCutomer = await updateCustomerUseCase.execute({
      authenticatedUserId,
      id,
      name,
      email,
      password,
      avatarFileName,
    })

    const createdCustomerWithoutPassword = removeObjectAttributes({
      object: updatedCutomer,
      attributes: [PASSWORD_ATTRIBUTE_TO_REMOVE]
    })

    return response
      .status(HTTP_STATUS_CODE.CREATED)
      .json(createdCustomerWithoutPassword)
  }
}
