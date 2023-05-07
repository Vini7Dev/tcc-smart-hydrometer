import { Router } from 'express'

import { GetProfileDataController } from '@modules/users/useCases/getProfileData/GetProfileDataController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const getProfileDataController = new GetProfileDataController()

export const profileRoutes = Router()

profileRoutes.get(
  '/',
  ensureAuthenticated,
  getProfileDataController.handle
)
