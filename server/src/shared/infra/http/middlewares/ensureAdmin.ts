import { Request, Response, NextFunction } from 'express'

import { AppError } from '@shared/errors/AppError'
import { ADMIN_ACCOUNT_TYPE } from '@utils/constants'
import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'

const USER_NOT_FOUND_ERROR = 'User not found!'

const USER_ISNT_ADMIN_ERROR = "User isn't admin!"

export const ensureAdmin = async (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  const { id } = request.user

  const usersRepository = new UsersRepository()

  const user = await usersRepository.findById(id)

  if (!user) {
    throw new AppError(USER_NOT_FOUND_ERROR)
  }

  if (user.account_type !== ADMIN_ACCOUNT_TYPE) {
    throw new AppError(USER_ISNT_ADMIN_ERROR)
  }

  next()
}
