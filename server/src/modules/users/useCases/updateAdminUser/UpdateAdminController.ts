import { HTTP_STATUS_CODE } from '@utils/constants'
import { removeObjectAttributes } from '@utils/removeObjectAttributes'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateAdminUseCase } from './UpdateAdminUseCase'

const PASSWORD_ATTRIBUTE_TO_REMOVE = 'password'

export class UpdateAdminController {
  public async handle(request: Request, response: Response) {
    const { id: authenticatedUserId } = request.user

    const { id } = request.params

    const { name, email, password } = request.body

    const avatarFileName = request.file?.filename

    const updateAdminUseCase = container.resolve(UpdateAdminUseCase)

    const updatedAdmin = await updateAdminUseCase.execute({
      authenticatedUserId,
      id,
      name,
      email,
      password,
      avatarFileName,
    })

    const updatedAdminWithoutPassword = removeObjectAttributes({
      object: updatedAdmin,
      attributes: [PASSWORD_ATTRIBUTE_TO_REMOVE]
    })

    return response
      .status(HTTP_STATUS_CODE.SUCCESS_DEFAULT)
      .json(updatedAdminWithoutPassword)
  }
}
