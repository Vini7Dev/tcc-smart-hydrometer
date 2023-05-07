import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { uploadMiddleware } from '@configs/upload'
import { CreateCustomerController } from '@modules/users/useCases/createCustomerUser/CreateCustomerController'
import { AVATAR_FILE_UPLOAD_FIELD } from '@utils/constants'
import { UpdateCustomerController } from '@modules/users/useCases/updateCustomerUser/UpdateCustomerController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const createCustomerController = new CreateCustomerController()
const updateCustomerController = new UpdateCustomerController()

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

customerRoutes.patch(
  '/:id',
  uploadMiddleware.single(AVATAR_FILE_UPLOAD_FIELD),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string(),
      password: Joi.string().min(8).alphanum(),
    }
  }),
  ensureAuthenticated,
  updateCustomerController.handle
)
