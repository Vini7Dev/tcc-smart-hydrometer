import { uploadMiddleware } from '@configs/upload'
import { CreateNewsController } from '@modules/news/useCases/createNews/CreateNewsController'
import { ListNewsController } from '@modules/news/useCases/listNews/ListNewsController'
import { SeeNewsController } from '@modules/news/useCases/seeNews/SeeNewsController'
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { NEWS_IMAGE_FILE_UPLOAD_FIELD } from '@utils/constants'
import { Router } from 'express'

const seeNewsController = new SeeNewsController()
const listNewsController = new ListNewsController()
const createNewsController = new CreateNewsController()

export const newsRoutes = Router()

newsRoutes.get('/:id', seeNewsController.handle)

newsRoutes.get('/', listNewsController.handle)

newsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  uploadMiddleware.array(NEWS_IMAGE_FILE_UPLOAD_FIELD),
  createNewsController.handle
)
