import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { HTTP_STATUS_CODE } from '@utils/constants'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  public async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const authToken = await authenticateUserUseCase.handle({
      email,
      password,
    })

    return response.status(HTTP_STATUS_CODE.CREATED).json(authToken)
  }
}
