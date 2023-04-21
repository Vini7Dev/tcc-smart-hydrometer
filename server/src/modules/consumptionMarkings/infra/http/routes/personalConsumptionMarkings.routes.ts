import { Router } from 'express'

import { SeePersonalConsumptionController } from '@modules/consumptionMarkings/useCases/seePersonalConsumption/SeePersonalConsumptionController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const seePersonalConsumptionController = new SeePersonalConsumptionController()

export const personalConsumptionMarkings = Router()

personalConsumptionMarkings.get(
  '/',
  ensureAuthenticated,
  seePersonalConsumptionController.handle
)
