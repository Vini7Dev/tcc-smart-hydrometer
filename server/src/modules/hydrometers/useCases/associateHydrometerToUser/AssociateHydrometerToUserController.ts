import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { HTTP_STATUS_CODE } from '@utils/constants'
import { removeObjectAttributes } from '@utils/removeObjectAttributes'
import { AssociateHydrometerToUserUseCase } from './AssociateHydrometerToUserUseCase'

const PASSWORD_ATTRIBUTE_TO_REMOVE = 'password'

export class AssociateHydrometerToUserController {
  public async handle(request: Request, response: Response) {
    const { id: user_id } = request.user

    const {
      hydrometer_name,
      hydrometer_password,
      consumption_category,
      address,
    } = request.body

    const associateHydrometerToUserUseCase = container.resolve(AssociateHydrometerToUserUseCase)

    const updatedHydrometer = await associateHydrometerToUserUseCase.execute({
      user_id,
      hydrometer_name,
      hydrometer_password,
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
