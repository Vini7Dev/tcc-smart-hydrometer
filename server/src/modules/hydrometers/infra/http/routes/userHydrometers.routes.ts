import { Router } from 'express'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { AssociateHydrometerToUserController } from '@modules/hydrometers/useCases/associateHydrometerToUser/AssociateHydrometerToUserController'
import { ListUserHydrometersController } from '@modules/hydrometers/useCases/listUserHydrometers/ListUserHydrometersController'

const associateHydrometerToUserController = new AssociateHydrometerToUserController()
const listUserHydrometersController = new ListUserHydrometersController()

export const userHydrometers = Router()

userHydrometers.get('/', ensureAuthenticated, listUserHydrometersController.handle)

userHydrometers.patch(
  '/',
  ensureAuthenticated,
  associateHydrometerToUserController.handle
)
