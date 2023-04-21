import { Router } from 'express'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { SeeRegionalConsumptionController } from '@modules/consumptionMarkings/useCases/seeRegionalConsumption/SeeRegionalConsumptionController'

const seeRegionalConsumptionController = new SeeRegionalConsumptionController()

export const regionalConsumptionMarkings = Router()

regionalConsumptionMarkings.get(
  '/',
  ensureAuthenticated,
  seeRegionalConsumptionController.handle
)
