import { Router } from 'express'

import { CreateConsumptionMarkingController } from '@modules/consumptionMarkings/useCases/createConsumptionMarking/CreateConsumptionMarkingController'
import { SeePersonalConsumptionController } from '@modules/consumptionMarkings/useCases/seePersonalConsumption/SeePersonalConsumptionController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const seePersonalConsumptionController = new SeePersonalConsumptionController()
const createConsumptionMarkingController = new CreateConsumptionMarkingController()

export const consumptionMarkingsRoutes = Router()

consumptionMarkingsRoutes.get(
  '/',
  ensureAuthenticated,
  seePersonalConsumptionController.handle
)

consumptionMarkingsRoutes.post('/', createConsumptionMarkingController.handle)
