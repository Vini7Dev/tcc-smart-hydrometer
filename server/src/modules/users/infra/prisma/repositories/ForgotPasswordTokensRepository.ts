import { ICreateForgotPasswordTokenDTO } from '@modules/users/dtos/ICreateForgotPasswordTokenDTO'
import { IForgotPasswordTokensRepository } from '@modules/users/repositories/IForgotPasswordTokensRepository'
import { AppRepository } from '@shared/infra/prisma/repositories/AppRepository'
import { ForgotPasswordToken } from '../entities/ForgotPasswordToken'

export class ForgotPasswordTokensRepository extends AppRepository implements IForgotPasswordTokensRepository {
  public async findById(id: number): Promise<ForgotPasswordToken | null> {
    const findedForgotPasswordToken = await this.client.forgotPasswordTokens.findFirst({
      where: { id }
    })

    return findedForgotPasswordToken
  }

  public async findByUserId(userId: string): Promise<ForgotPasswordToken | null> {
    const findedForgotPasswordToken = await this.client.forgotPasswordTokens.findFirst({
      where: {
        user_id: userId
      }
    })

    return findedForgotPasswordToken
  }

  public async create({
    token,
    user_id,
  }: ICreateForgotPasswordTokenDTO): Promise<ForgotPasswordToken> {
    const createdForgotPasswordToken = await this.client.forgotPasswordTokens.create({
      data: {
        id: token,
        user_id,
      }
    })

    return createdForgotPasswordToken
  }

  public async delete(id: number): Promise<void> {
    await this.client.forgotPasswordTokens.delete({
      where: { id }
    })
  }
}
