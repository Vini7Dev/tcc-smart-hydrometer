import { HTTP_STATUS_CODE } from '@utils/constants'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCustomerUseCase } from './CreateCustomerUseCase'

export class CreateCustomerController {
  public async handle(request: Request, response: Response) {
    const { name, email, password } = request.body

    const createCustomerUseCase = container.resolve(CreateCustomerUseCase)

    const useCaseResponse = await createCustomerUseCase.execute({
      name,
      email,
      password,
    })

    return response.status(HTTP_STATUS_CODE.CREATED).json(useCaseResponse)
  }
}
