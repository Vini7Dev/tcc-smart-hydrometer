import { faker } from '@faker-js/faker'
import { addHours, isLastDayOfMonth } from 'date-fns'

import { CUSTOMER_ACCOUNT_TYPE } from '@utils/constants'
import { AccountType, ConsumptionCategory, PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

const createCustomer = async () => {
  const GITHUB_AVATAR_BASE_URL = 'https://avatars.githubusercontent.com/'
  const EMPTY_STRING = ''

  const avatarFileFormat = faker.image
    .avatarGitHub()
    .replace(GITHUB_AVATAR_BASE_URL, EMPTY_STRING)

  const customerData = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    account_type: CUSTOMER_ACCOUNT_TYPE as AccountType,
    avatar_file: avatarFileFormat,
  }

  await prismaClient.users.create({ data: customerData })

  return { customerData }
}

const createHydrometer = async (customerData: any) => {
  const RESIDENTIAL_NORMAL = 'RESIDENTIAL_NORMAL'
  const ACCEPT_SHARE_CONCUMPTION = true
  const A_TRILLION_TO_DECREASE_NUMBER = 100000000000

  const addressData = {
    id: faker.string.uuid(),
    postal_code: faker.location.zipCode(),
    street: faker.location.street(),
    number: faker.location.buildingNumber(),
    neighborhood: faker.location.city(),
    city: faker.location.city(),
    state: faker.location.state(),
  }

  const hydrometerData = {
    id: Math.trunc(faker.number.int() / A_TRILLION_TO_DECREASE_NUMBER),
    address_id: addressData.id,
    user_id: customerData.id,
    password: faker.internet.password(),
    name: addressData.street,
    consumption_category: RESIDENTIAL_NORMAL as ConsumptionCategory,
    share_consumption: ACCEPT_SHARE_CONCUMPTION,
  }

  await prismaClient.adresses.create({ data: addressData })

  await prismaClient.hydrometers.create({ data: hydrometerData })

  return { addressData, hydrometerData }
}

const createConsumptionMarkings = async (hydrometerData: any, count = 1) => {
  const FIRST_DAY_OF_THE_YEAR = new Date(2023, 0, 1, 0)
  const LAST_HOUR_OF_THE_DAY_TO_COMPARE = 21

  const consumptionMarkings = []

  let sumOfHours = 0
  let consumptionSum = 0

  for (let i = 0; i < count; i++) {
    const markingDate = addHours(FIRST_DAY_OF_THE_YEAR, sumOfHours)

    if (
      isLastDayOfMonth(markingDate)
      && markingDate.getHours() === LAST_HOUR_OF_THE_DAY_TO_COMPARE
    ) {
      consumptionSum = 0
    }

    consumptionSum += Number(Math.random().toFixed(1)) * 10 * 2

    const consumptionMarkingData = {
      id: faker.string.uuid(),
      hydrometer_id: hydrometerData.id,
      consumption: consumptionSum,
      monetary_value: 0,
      created_at: markingDate
    }

    sumOfHours += 1

    consumptionMarkings.push(consumptionMarkingData)
  }

  await prismaClient.consumptionMarkings.createMany({ data: consumptionMarkings })

  return { consumptionMarkings }
}

const sendToDataBase = async () => {
  const TOTAL_OF_CONSUMPTION_MARKINGS = 756

  const { customerData } = await createCustomer()

  const { hydrometerData } = await createHydrometer(customerData)

  await createConsumptionMarkings(hydrometerData, TOTAL_OF_CONSUMPTION_MARKINGS)
}

sendToDataBase()
