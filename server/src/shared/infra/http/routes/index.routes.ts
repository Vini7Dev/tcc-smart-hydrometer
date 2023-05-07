import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerDocs from '@docs/swagger.json'
import { profileRoutes } from '@modules/users/infra/http/routes/profile.routes'
import { adminsRoutes } from '@modules/users/infra/http/routes/admins.routes'
import { authenticateRoutes } from '@modules/users/infra/http/routes/authenticate.routes'
import { customerRoutes } from '@modules/users/infra/http/routes/customers.routes'
import { passwordRoutes } from '@modules/users/infra/http/routes/password.routes'
import { newsRoutes } from '@modules/news/infra/http/routes/news.routes'
import { hydrometersRoutes } from '@modules/hydrometers/infra/http/routes/hydrometers.routes'
import { userHydrometers } from '@modules/hydrometers/infra/http/routes/userHydrometers.routes'
import { consumptionMarkingsRoutes } from '@modules/consumptionMarkings/infra/http/routes/consumptionMarkings.routes'
import { personalConsumptionMarkingsRoutes } from '@modules/consumptionMarkings/infra/http/routes/personalConsumptionMarkings.routes'
import { regionalConsumptionMarkingsRoutes } from '@modules/consumptionMarkings/infra/http/routes/regionalConsumptionMarkings.routes'

export const appRoutes = Router()

appRoutes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

appRoutes.use('/profile', profileRoutes)
appRoutes.use('/admins', adminsRoutes)
appRoutes.use('/customers', customerRoutes)
appRoutes.use('/authenticate', authenticateRoutes)
appRoutes.use('/password', passwordRoutes)
appRoutes.use('/news', newsRoutes)
appRoutes.use('/hydrometers', hydrometersRoutes)
appRoutes.use('/user-hydrometers', userHydrometers)
appRoutes.use('/consumption-markings', consumptionMarkingsRoutes)
appRoutes.use('/personal-consumption-markings', personalConsumptionMarkingsRoutes)
appRoutes.use('/regional-consumption-markings', regionalConsumptionMarkingsRoutes)
