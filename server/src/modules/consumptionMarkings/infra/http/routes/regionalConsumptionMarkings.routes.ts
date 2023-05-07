import { Router } from 'express'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { SeeRegionalConsumptionController } from '@modules/consumptionMarkings/useCases/seeRegionalConsumption/SeeRegionalConsumptionController'

const seeRegionalConsumptionController = new SeeRegionalConsumptionController()

export const regionalConsumptionMarkingsRoutes = Router()

regionalConsumptionMarkingsRoutes.get(
  '/',
  ensureAuthenticated,
  seeRegionalConsumptionController.handle
)
