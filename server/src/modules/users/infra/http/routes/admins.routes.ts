import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { CreateAdminController } from '@modules/users/useCases/createAdminUser/CreateAdminController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'
import { ListAdminsController } from '@modules/users/useCases/listAdmins/ListAdminsController'
import { uploadMiddleware } from '@configs/upload'
import { AVATAR_FILE_UPLOAD_FIELD } from '@utils/constants'
import { UpdateAdminController } from '@modules/users/useCases/updateAdminUser/UpdateAdminController'

const listAdminsController = new ListAdminsController()
const createAdminController = new CreateAdminController()
const updateAdminController = new UpdateAdminController()

export const adminsRoutes = Router()

adminsRoutes.get('/', ensureAuthenticated, ensureAdmin, listAdminsController.handle)

adminsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  uploadMiddleware.single(AVATAR_FILE_UPLOAD_FIELD),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(8).alphanum().required(),
    },
  }),
  createAdminController.handle
)

adminsRoutes.patch(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadMiddleware.single(AVATAR_FILE_UPLOAD_FIELD),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string(),
      password: Joi.string().min(8).alphanum(),
    },
  }),
  updateAdminController.handle
)
