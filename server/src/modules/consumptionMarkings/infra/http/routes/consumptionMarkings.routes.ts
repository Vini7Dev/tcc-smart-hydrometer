import { Router } from 'express'

import { CreateConsumptionMarkingController } from '@modules/consumptionMarkings/useCases/createConsumptionMarking/CreateConsumptionMarkingController'

const createConsumptionMarkingController = new CreateConsumptionMarkingController()

export const consumptionMarkingsRoutes = Router()

consumptionMarkingsRoutes.post('/', createConsumptionMarkingController.handle)
