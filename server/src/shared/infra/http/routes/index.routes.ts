import { Router } from 'express'

import { adminsRoutes } from '@modules/users/infra/http/routes/admins.routes'
import { authenticateRoutes } from '@modules/users/infra/http/routes/authenticate.routes'
import { customerRoutes } from '@modules/users/infra/http/routes/customers.routes'

export const appRoutes = Router()

appRoutes.use('/admins', adminsRoutes)
appRoutes.use('/customers', customerRoutes)
appRoutes.use('/authenticate', authenticateRoutes)
