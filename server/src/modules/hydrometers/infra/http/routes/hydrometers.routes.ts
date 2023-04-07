import { Router } from 'express'

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { GenerateHydrometerController } from '@modules/hydrometers/useCases/generateHydrometer/GenerateHydrometerController'

const generateHydrometerController = new GenerateHydrometerController()

export const hydrometersRoutes = Router()

hydrometersRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  generateHydrometerController.handle
)
