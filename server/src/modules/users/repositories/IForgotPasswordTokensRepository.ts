import { ICreateForgotPasswordTokenDTO } from '../dtos/ICreateForgotPasswordTokenDTO'
import { ForgotPasswordToken } from '../infra/prisma/entities/ForgotPasswordToken'

export interface IForgotPasswordTokensRepository {
  findById(id: string): Promise<ForgotPasswordToken | null>
  findByUserId(userId: string): Promise<ForgotPasswordToken | null>
  create(data: ICreateForgotPasswordTokenDTO): Promise<ForgotPasswordToken>
  delete(id: string): Promise<void>
}
