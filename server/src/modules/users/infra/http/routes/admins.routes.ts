import { Router } from 'express'

import { CreateAdminController } from '@modules/users/useCases/CreateAdminController'

const createAdminController = new CreateAdminController()

export const adminsRoutes = Router()

adminsRoutes.post('/', createAdminController.handle)
