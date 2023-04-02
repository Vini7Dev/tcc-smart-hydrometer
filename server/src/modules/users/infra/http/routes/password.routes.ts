import { Router } from 'express'

import { ForgotPasswordController } from '@modules/users/useCases/forgotPassword/ForgotPasswordController'

const forgotPasswordController = new ForgotPasswordController()

export const passwordRoutes = Router()

passwordRoutes.post('/forgot', forgotPasswordController.handle)
