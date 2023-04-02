import { HTTP_STATUS_CODE } from '@utils/constants'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ForgotPasswordUseCase } from './ForgotPasswordUseCase'

export class ForgotPasswordController {
  public async handle(request: Request, response: Response) {
    const { email } = request.body

    const forgotPasswordUseCase = container.resolve(ForgotPasswordUseCase)

    const forgotPasswordResponse = await forgotPasswordUseCase.execute({ email })

    return response
      .status(HTTP_STATUS_CODE.SUCCESS_DEFAULT)
      .json(forgotPasswordResponse)
  }
}
