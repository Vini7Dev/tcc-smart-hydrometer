import { Router } from 'express'

import { adminsRoutes } from '../../../../modules/users/infra/http/routes/admins.routes'

export const appRoutes = Router()

appRoutes.use('/admins', adminsRoutes)
