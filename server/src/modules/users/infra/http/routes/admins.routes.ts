import { Router } from 'express'
import { CreateAdminController } from '../../../useCases/CreateAdminController'

const createAdminController = new CreateAdminController()

export const adminsRoutes = Router()

adminsRoutes.post('/', createAdminController.handle)
