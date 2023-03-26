import 'reflect-metadata'
import 'dotenv/config'

import '@shared/containers'
import express from 'express'

import { appRoutes } from './routes/index.routes'

const SERVER_PORT = process.env.SERVER_PORT ?? 3333

const server = express()

server.use(express.json())

server.use(appRoutes)

server.listen(SERVER_PORT, () => {
  console.log(`===> Server started on port ${SERVER_PORT}`)
})
