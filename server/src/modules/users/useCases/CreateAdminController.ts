import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateAdminUseCase } from './CreateAdminUseCase'

export class CreateAdminController {
  public async handle(request: Request, response: Response) {
    const { name, email, password } = request.body

    const createAdminUseCase = container.resolve(CreateAdminUseCase)

    const useCaseResponse = await createAdminUseCase.execute({
      name,
      email,
      password,
    })

    return response.json(useCaseResponse).status(201)
  }
}
