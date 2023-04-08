import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { HTTP_STATUS_CODE } from '@utils/constants'
import { removeObjectAttributes } from '@utils/removeObjectAttributes'
import { DisassociateUserFromHydrometerUseCase } from './DisassociateUserFromHydrometerUseCase'

const PASSWORD_ATTRIBUTE_TO_REMOVE = 'password'

export class DisassociateUserFromHydrometerController {
  public async handle(request: Request, response: Response) {
    const { id: user_id } = request.user

    const { id: hydrometer_id } = request.params

    const disassociateHydrometerFromUserUseCase = container.resolve(DisassociateUserFromHydrometerUseCase)

    const updatedHydrometer = await disassociateHydrometerFromUserUseCase.execute({
      user_id,
      hydrometer_id: Number(hydrometer_id),
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
