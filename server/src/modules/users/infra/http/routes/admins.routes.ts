import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { CreateAdminController } from '@modules/users/useCases/createUser/CreateAdminController'

const createAdminController = new CreateAdminController()

export const adminsRoutes = Router()

adminsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(8).alphanum().required(),
    }
  }),
  createAdminController.handle
)
