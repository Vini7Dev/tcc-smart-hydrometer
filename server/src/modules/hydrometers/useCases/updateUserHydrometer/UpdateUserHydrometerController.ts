import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { HTTP_STATUS_CODE } from '@utils/constants'
import { removeObjectAttributes } from '@utils/removeObjectAttributes'
import { UpdateUserHydrometerUseCase } from './UpdateUserHydrometerUseCase'

const PASSWORD_ATTRIBUTE_TO_REMOVE = 'password'

export class UpdateUserHydrometerController {
  public async handle(request: Request, response: Response) {
    const { id: user_id } = request.user

    const { id: hydrometer_id } = request.params

    const {
      name,
      share_consumption,
      consumption_category,
      address,
    } = request.body

    const updateUserHydrometerUseCase = container.resolve(UpdateUserHydrometerUseCase)

    const updatedHydrometer = await updateUserHydrometerUseCase.execute({
      id: Number(hydrometer_id),
      user_id,
      name,
      share_consumption,
      consumption_category,
      address,
    })

    const updatedHydrometerWithoutPassword = removeObjectAttributes({
      object: updatedHydrometer,
      attributes: [PASSWORD_ATTRIBUTE_TO_REMOVE]
    })

    return response
      .json(updatedHydrometerWithoutPassword)
      .status(HTTP_STATUS_CODE.SUCCESS_DEFAULT)
  }
}
