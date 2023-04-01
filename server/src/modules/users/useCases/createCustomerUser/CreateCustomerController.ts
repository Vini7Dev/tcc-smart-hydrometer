import { HTTP_STATUS_CODE } from '@utils/constants'
import { removeObjectAttributes } from '@utils/removeObjectAttributes'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCustomerUseCase } from './CreateCustomerUseCase'

const PASSWORD_ATTRIBUTE_TO_REMOVE = 'password'

export class CreateCustomerController {
  public async handle(request: Request, response: Response) {
    const { name, email, password } = request.body

    const createCustomerUseCase = container.resolve(CreateCustomerUseCase)

    const createdCutomer = await createCustomerUseCase.execute({
      name,
      email,
      password,
    })

    const createdCustomerWithoutPassword = removeObjectAttributes({
      object: createdCutomer,
      attributes: [PASSWORD_ATTRIBUTE_TO_REMOVE]
    })

    return response
      .status(HTTP_STATUS_CODE.CREATED)
      .json(createdCustomerWithoutPassword)
  }
}
