import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { HTTP_STATUS_CODE } from '@utils/constants'
import { ListUserHydrometersUseCase } from './ListUserHydrometersUseCase'

export class ListUserHydrometersController {
  public async handle(request: Request, response: Response) {
    const { id: user_id } = request.user

    const listUserHydrometersUseCase = container.resolve(ListUserHydrometersUseCase)

    const userHydrometerList = await listUserHydrometersUseCase.execute({
      user_id,
    })

    return response.json(userHydrometerList).status(HTTP_STATUS_CODE.SUCCESS_DEFAULT)
  }
}
