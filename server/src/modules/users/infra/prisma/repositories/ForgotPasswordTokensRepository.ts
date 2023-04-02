import { ICreateForgotPasswordTokenDTO } from '@modules/users/dtos/ICreateForgotPasswordTokenDTO'
import { IForgotPasswordTokensRepository } from '@modules/users/repositories/IForgotPasswordTokensRepository'
import { AppRepository } from '@shared/infra/prisma/repositories/AppRepository'
import { ForgotPasswordToken } from '../entities/ForgotPasswordToken'

export class ForgotPasswordTokensRepository extends AppRepository implements IForgotPasswordTokensRepository {
  public async findById(id: string): Promise<ForgotPasswordToken | null> {
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
    user_id
  }: ICreateForgotPasswordTokenDTO): Promise<ForgotPasswordToken> {
    const createdForgotPasswordToken = await this.client.forgotPasswordTokens.create({
      data: {
        user_id,
      }
    })

    return createdForgotPasswordToken
  }

  public async delete(id: string): Promise<void> {
    const deletedForgotPasswordToken = await this.client.forgotPasswordTokens.delete({
      where: { id }
    })
  }
}
