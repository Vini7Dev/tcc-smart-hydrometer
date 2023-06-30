import { ICreateForgotPasswordTokenDTO } from '../dtos/ICreateForgotPasswordTokenDTO'
import { ForgotPasswordToken } from '../infra/prisma/entities/ForgotPasswordToken'

export interface IForgotPasswordTokensRepository {
  findById(id: number): Promise<ForgotPasswordToken | null>
  findByUserId(userId: string): Promise<ForgotPasswordToken | null>
  create(data: ICreateForgotPasswordTokenDTO): Promise<ForgotPasswordToken>
  delete(id: number): Promise<void>
}
