import { HTTP_STATUS_CODE } from '@utils/constants'
import { removeObjectAttributes } from '@utils/removeObjectAttributes'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListAdminsUseCase } from './ListAdminsUseCase'

const PASSWORD_ATTRIBUTE_TO_REMOVE = 'password'

export class ListAdminsController {
  public async handle(_request: Request, response: Response) {
    const listAdminsUseCase = container.resolve(ListAdminsUseCase)

    const adminList = await listAdminsUseCase.execute()

    const adminListWithoutPassword = adminList.map(admin => removeObjectAttributes({
      object: admin,
      attributes: [PASSWORD_ATTRIBUTE_TO_REMOVE]
    }))

    return response
      .status(HTTP_STATUS_CODE.SUCCESS_DEFAULT)
      .json(adminListWithoutPassword)
  }
}
