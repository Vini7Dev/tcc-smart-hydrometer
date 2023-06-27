import { PrismaClient } from '@prisma/client'

const resetDatabase = async () => {
  const prismaClient = new PrismaClient()

  await prismaClient.$queryRawUnsafe(`DROP SCHEMA public CASCADE;`)

  await prismaClient.$queryRawUnsafe(`CREATE SCHEMA public;`)

  await prismaClient.$queryRawUnsafe(`GRANT ALL ON SCHEMA public TO postgres;`)

  await prismaClient.$queryRawUnsafe(`GRANT ALL ON SCHEMA public TO public;`)
}

resetDatabase()
