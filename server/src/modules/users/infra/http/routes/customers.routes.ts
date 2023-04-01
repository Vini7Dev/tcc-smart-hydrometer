import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { CreateCustomerController } from '@modules/users/useCases/createCustomerUser/CreateCustomerController'
import { uploadMiddleware } from '@configs/upload'
import { AVATAR_FILE_UPLOAD_FIELD } from '@utils/constants'

const createCustomerController = new CreateCustomerController()

export const customerRoutes = Router()

customerRoutes.post(
  '/',
  uploadMiddleware.single(AVATAR_FILE_UPLOAD_FIELD),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(8).alphanum().required(),
    }
  }),
  createCustomerController.handle
)
