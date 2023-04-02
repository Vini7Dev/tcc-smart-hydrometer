import { HTTP_STATUS_CODE } from '@utils/constants'
import { removeObjectAttributes } from '@utils/removeObjectAttributes'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ResetPasswordUseCase } from './ResetPasswordUseCase'

const PASSWORD_ATTRIBUTE_TO_REMOVE = 'password'

export class ResetPasswordController {
  public async handle(request: Request, response: Response) {
    const { token, password } = request.body

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase)

    const updatedUser = await resetPasswordUseCase.execute({
      token,
      password
    })

    const updatedUserWithoutPassword = removeObjectAttributes({
      object: updatedUser,
      attributes: [PASSWORD_ATTRIBUTE_TO_REMOVE]
    })

    return response
      .status(HTTP_STATUS_CODE.SUCCESS_DEFAULT)
      .json(updatedUserWithoutPassword)
  }
}
