import { Router } from 'express'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { AssociateHydrometerToUserController } from '@modules/hydrometers/useCases/associateHydrometerToUser/AssociateHydrometerToUserController'

const associateHydrometerToUserController = new AssociateHydrometerToUserController()

export const userHydrometers = Router()

userHydrometers.patch(
  '/',
  ensureAuthenticated,
  associateHydrometerToUserController.handle
)
