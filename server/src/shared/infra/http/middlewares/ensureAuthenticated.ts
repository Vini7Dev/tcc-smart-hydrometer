import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '@shared/errors/AppError'
import { HTTP_STATUS_CODE } from '@utils/constants'
import { authConfig } from '@configs/auth'

interface IPayload {
  sub: string
}

const BEARER_TOKEN_SPACE_DIVISOR = ' '

const TOKEN_NOT_FOUND_ERROR = 'Token not found!'
const INVALID_TOKEN_ERROR = 'Invalid token!'

export const ensureAuthenticated = async (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  const bearerToken = request.headers.authorization

  if (!bearerToken) {
    throw new AppError(TOKEN_NOT_FOUND_ERROR, HTTP_STATUS_CODE.UNAUTHORIZED)
  }

  try {
    const [, token] = bearerToken.split(BEARER_TOKEN_SPACE_DIVISOR)

    const { secret } = authConfig.token

    const { sub: user_id } = verify(token, secret) as IPayload

    request.user = {
      id: user_id,
    }

    next()
  } catch {
    throw new AppError(INVALID_TOKEN_ERROR, HTTP_STATUS_CODE.UNAUTHORIZED)
  }
}
