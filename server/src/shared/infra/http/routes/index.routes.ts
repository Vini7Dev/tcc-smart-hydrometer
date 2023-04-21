import { Router } from 'express'

import { adminsRoutes } from '@modules/users/infra/http/routes/admins.routes'
import { authenticateRoutes } from '@modules/users/infra/http/routes/authenticate.routes'
import { customerRoutes } from '@modules/users/infra/http/routes/customers.routes'
import { passwordRoutes } from '@modules/users/infra/http/routes/password.routes'
import { newsRoutes } from '@modules/news/infra/http/routes/news.routes'
import { hydrometersRoutes } from '@modules/hydrometers/infra/http/routes/hydrometers.routes'
import { userHydrometers } from '@modules/hydrometers/infra/http/routes/userHydrometers.routes'
import { consumptionMarkingsRoutes } from '@modules/consumptionMarkings/infra/http/routes/consumptionMarkings.routes'
import { personalConsumptionMarkings } from '@modules/consumptionMarkings/infra/http/routes/personalConsumptionMarkings.routes'
import { regionalConsumptionMarkings } from '@modules/consumptionMarkings/infra/http/routes/regionalConsumptionMarkings.routes'

export const appRoutes = Router()

appRoutes.use('/admins', adminsRoutes)
appRoutes.use('/customers', customerRoutes)
appRoutes.use('/authenticate', authenticateRoutes)
appRoutes.use('/password', passwordRoutes)
appRoutes.use('/news', newsRoutes)
appRoutes.use('/hydrometers', hydrometersRoutes)
appRoutes.use('/user-hydrometers', userHydrometers)
appRoutes.use('/consumption-markings', consumptionMarkingsRoutes)
appRoutes.use('/personal-consumption-markings', personalConsumptionMarkings)
appRoutes.use('/regional-consumption-markings', regionalConsumptionMarkings)
