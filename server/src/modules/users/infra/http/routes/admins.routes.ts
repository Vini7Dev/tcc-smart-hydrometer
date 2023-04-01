import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { CreateAdminController } from '@modules/users/useCases/createAdminUser/CreateAdminController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'
import { ListAdminsController } from '@modules/users/useCases/listAdmins/ListAdminsController'

const listAdminsController = new ListAdminsController()
const createAdminController = new CreateAdminController()

export const adminsRoutes = Router()

adminsRoutes.get('/', ensureAuthenticated, ensureAdmin, listAdminsController.handle)

adminsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(8).alphanum().required(),
    }
  }),
  createAdminController.handle
)
