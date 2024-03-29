import { Router } from 'express'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { AssociateHydrometerToUserController } from '@modules/hydrometers/useCases/associateHydrometerToUser/AssociateHydrometerToUserController'
import { ListUserHydrometersController } from '@modules/hydrometers/useCases/listUserHydrometers/ListUserHydrometersController'
import { DisassociateUserFromHydrometerController } from '@modules/hydrometers/useCases/disassociateHydrometerFromUser/DisassociateUserFromHydrometerController'
import { UpdateUserHydrometerController } from '@modules/hydrometers/useCases/updateUserHydrometer/UpdateUserHydrometerController'

const listUserHydrometersController = new ListUserHydrometersController()
const associateHydrometerToUserController = new AssociateHydrometerToUserController()
const updateUserHydrometerController = new UpdateUserHydrometerController()
const disassociateUserFromHydrometerController = new DisassociateUserFromHydrometerController()

export const userHydrometers = Router()

userHydrometers.get('/', ensureAuthenticated, listUserHydrometersController.handle)

userHydrometers.post(
  '/:id',
  ensureAuthenticated,
  associateHydrometerToUserController.handle
)

userHydrometers.patch(
  '/:id',
  ensureAuthenticated,
  updateUserHydrometerController.handle
)

userHydrometers.delete(
  '/:id',
  ensureAuthenticated,
  disassociateUserFromHydrometerController.handle
)
