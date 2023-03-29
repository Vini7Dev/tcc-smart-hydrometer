import { Router } from 'express'

import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController'

const authenticateUserController = new AuthenticateUserController()

export const authenticateRoutes = Router()

authenticateRoutes.post('/', authenticateUserController.handle)
