import { HTTP_STATUS_CODE } from '@utils/constants'

export class AppError {
  public readonly message: string

  public readonly code: number

  constructor (message: string, code = HTTP_STATUS_CODE.ERROR_DEFAULT) {
    this.message = message
    this.code = code
  }
}
