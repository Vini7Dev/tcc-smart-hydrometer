import { Router } from 'express'

import { adminsRoutes } from '@modules/users/infra/http/routes/admins.routes'
import { authenticateRoutes } from '@modules/users/infra/http/routes/authenticate.routes'

export const appRoutes = Router()

appRoutes.use('/admins', adminsRoutes)
appRoutes.use('/authenticate', authenticateRoutes)
