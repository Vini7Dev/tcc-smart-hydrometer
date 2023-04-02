import 'reflect-metadata'
import 'dotenv/config'
import 'express-async-errors'

import '@shared/containers'
import express, { NextFunction, Request, Response } from 'express'

import { appRoutes } from './routes/index.routes'
import { AppError } from '@shared/errors/AppError'
import { uploadConfig } from '@configs/upload'
import { HTTP_STATUS_CODE } from '@utils/constants'

const SERVER_PORT = process.env.SERVER_PORT ?? 3333

const { uploadsFolder } = uploadConfig

const server = express()

server.use(express.json())

server.use('/files', express.static(uploadsFolder))

server.use(appRoutes)

server.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ): Response => {
    if (error instanceof AppError) {
      return response.status(error.code).json({ error: error.message })
    }

    console.error(error)

    return response
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: `Internal Server Error: ${error.message}` })
  },
)

server.listen(SERVER_PORT, () => {
  console.log(`===> Server started on port ${SERVER_PORT}`)
})
