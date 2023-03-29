import 'dotenv/config'

import { PrismaClient } from '@prisma/client'
import { BCryptHashProvider } from '@shared/containers/providers/HashProvider/implementations/BCryptHashProvider'
import { ADMIN_ACCOUNT_TYPE } from '@utils/constants'

const prisma = new PrismaClient()

const SEED_ADMIN_NAME = process.env.SEED_ADMIN_NAME
const SEED_ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL
const SEED_ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD

export const createAdmin = async () => {
  console.log('[SEED] Creating seed admin...')

  if (!SEED_ADMIN_NAME || !SEED_ADMIN_EMAIL || !SEED_ADMIN_PASSWORD) {
    throw new Error('Please set admin seed data.')
  }

  const seedAdminEmailAlreadyExists = await prisma.users.findFirst({
    where: { email: SEED_ADMIN_EMAIL }
  })

  if (seedAdminEmailAlreadyExists) {
    throw new Error('This seed admin email already exists, please use another email.')
  }

  const bCryptHashProvider = new BCryptHashProvider()

  const passwordHash = await bCryptHashProvider.generateHash(SEED_ADMIN_PASSWORD)

  await prisma.users.create({
    data: {
      name: SEED_ADMIN_NAME,
      email: SEED_ADMIN_EMAIL,
      password: passwordHash,
      account_type: ADMIN_ACCOUNT_TYPE,
    }
  })

  console.log('[SEED] Seed admin created!')
}

createAdmin()
  .then(() => console.log('[FINISH] Seed executed successfully!'))
  .catch((err) => console.error(`[ERROR] ${err.message}`))
