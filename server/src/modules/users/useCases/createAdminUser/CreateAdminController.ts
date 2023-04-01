import { HTTP_STATUS_CODE } from '@utils/constants'
import { removeObjectAttributes } from '@utils/removeObjectAttributes'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateAdminUseCase } from './CreateAdminUseCase'

const PASSWORD_ATTRIBUTE_TO_REMOVE = 'password'

export class CreateAdminController {
  public async handle(request: Request, response: Response) {
    const { name, email, password } = request.body

    const createAdminUseCase = container.resolve(CreateAdminUseCase)

    const createdAdmin = await createAdminUseCase.execute({
      name,
      email,
      password,
    })

    const createdAdminWithoutPassword = removeObjectAttributes({
      object: createdAdmin,
      attributes: [PASSWORD_ATTRIBUTE_TO_REMOVE]
    })

    return response
      .status(HTTP_STATUS_CODE.CREATED)
      .json(createdAdminWithoutPassword)
  }
}
