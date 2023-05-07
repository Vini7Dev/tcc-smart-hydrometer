import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { HTTP_STATUS_CODE } from '@utils/constants'
import { removeObjectAttributes } from '@utils/removeObjectAttributes'
import { GetProfileDataUseCase } from './GetProfileDataUseCase'

const PASSWORD_ATTRIBUTE_TO_REMOVE = 'password'

export class GetProfileDataController {
  public async handle(request: Request, response: Response) {
    const { id: authenticatedUserId } = request.user

    const getProfileDataUseCase = container.resolve(GetProfileDataUseCase)

    const profileData = await getProfileDataUseCase.execute({
      authenticatedUserId,
    })

    const profileDataWithoutPassword = removeObjectAttributes({
      object: profileData,
      attributes: [PASSWORD_ATTRIBUTE_TO_REMOVE]
    })

    return response
      .status(HTTP_STATUS_CODE.SUCCESS_DEFAULT)
      .json(profileDataWithoutPassword)
  }
}
