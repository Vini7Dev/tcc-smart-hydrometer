import { Router } from 'express'

import { ForgotPasswordController } from '@modules/users/useCases/forgotPassword/ForgotPasswordController'
import { ResetPasswordController } from '@modules/users/useCases/resetPassword/ResetPasswordController'

const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

export const passwordRoutes = Router()

passwordRoutes.post('/forgot', forgotPasswordController.handle)
passwordRoutes.post('/reset', resetPasswordController.handle)
