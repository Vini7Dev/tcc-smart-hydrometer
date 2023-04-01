import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { CreateCustomerController } from '@modules/users/useCases/createCustomerUser/CreateCustomerController'

const createCustomerController = new CreateCustomerController()

export const customerRoutes = Router()

customerRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(8).alphanum().required(),
    }
  }),
  createCustomerController.handle
)
