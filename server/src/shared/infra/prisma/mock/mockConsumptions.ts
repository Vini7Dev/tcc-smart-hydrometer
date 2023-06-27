import { faker } from '@faker-js/faker'
import { addHours, format, isLastDayOfMonth } from 'date-fns'
import { AccountType, ConsumptionCategory, PrismaClient } from '@prisma/client'

import { CUSTOMER_ACCOUNT_TYPE } from '@utils/constants'
import { BCryptHashProvider } from '@shared/containers/providers/HashProvider/implementations/BCryptHashProvider'
import { calculateConsumptionMonetaryByCity } from '@utils/calculateConsumptionMonetaryByCity'

const prismaClient = new PrismaClient()

const createCitiesAndConsumptionConversions = async () => {
  console.log('===> [START] Create Cities And Consumption Conversions')

  const RESIDENTIAL_NORMAL = 'RESIDENTIAL_NORMAL'
  const A_TRILLION_TO_DECREASE_NUMBER = 100000000000
  const CONVERSION_RULES = [
    { rule: '0 a 10', water_rate: 3585, sewer_rate: 2875 },
    { rule: '11 a 20', water_rate: 500, sewer_rate: 394 },
    { rule: '21 a 50', water_rate: 768, sewer_rate: 614 },
    { rule: 'acima de 50', water_rate: 918, sewer_rate: 731 },
  ]

  const cityForConversionData = {
    id: faker.string.uuid(),
    name: faker.location.city(),
    code: Math.trunc(faker.number.int() / A_TRILLION_TO_DECREASE_NUMBER),
    last_update: format(faker.date.anytime(), 'dd-MM-yyyy'),
  }

  const categoryForConversionData = {
    id: faker.string.uuid(),
    city_for_conversion_id: cityForConversionData.id,
    category: RESIDENTIAL_NORMAL,
  }

  const consumptionConversionList = []

  for (const conversionRule of CONVERSION_RULES) {
    const consumptionConversionData = {
      id: faker.string.uuid(),
      category_for_conversion_id: categoryForConversionData.id,
      water_rate: conversionRule.water_rate,
      sewer_rate: conversionRule.sewer_rate,
      rule: conversionRule.rule,
    }

    consumptionConversionList.push(consumptionConversionData)
  }

  await prismaClient.citiesForConversion.create({ data: cityForConversionData })

  await prismaClient.categoriesForConversion.create({ data: categoryForConversionData })

  await prismaClient.consumptionConversions.createMany({ data: consumptionConversionList })

  console.log('===> [OK] Create Cities And Consumption Conversions')

  return {
    cityForConversionData,
    categoryForConversionData,
    consumptionConversionList,
  }
}

const createCustomer = async () => {
  console.log('===> [START] Create Customer')

  const GITHUB_AVATAR_BASE_URL = 'https://avatars.githubusercontent.com/'
  const EMPTY_STRING = ''

  const CUSTOMER_MOCK_EMAIL = 'mock@mail.com'
  const CUSTOMER_MOCK_PASSWORD = 'mock1234'

  const avatarFileFormat = faker.image
    .avatarGitHub()
    .replace(GITHUB_AVATAR_BASE_URL, EMPTY_STRING)

  const bCryptHashProvider = new BCryptHashProvider()

  const customerData = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: CUSTOMER_MOCK_EMAIL,
    password: await bCryptHashProvider.generateHash(CUSTOMER_MOCK_PASSWORD),
    account_type: CUSTOMER_ACCOUNT_TYPE as AccountType,
    avatar_file: avatarFileFormat,
  }

  await prismaClient.users.create({ data: customerData })

  console.log('===> [OK] Create Customer')

  return { customerData }
}

const createHydrometer = async (customerData: any) => {
  console.log('===> [START] Create Hydrometer')

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

  Object.assign(addressData, {
    categoriesForConversion: [{
      category: 'RESIDENCIAL / NORMAL',
      consumptionConversions: [
        { rule: '0 a 10', water_rate: 3585, sewer_rate: 2875 },
        { rule: '11 a 20', water_rate: 500, sewer_rate: 394 },
        { rule: '21 a 50', water_rate: 768, sewer_rate: 614 },
        { rule: 'acima de 50', water_rate: 918, sewer_rate: 731 },
      ]
    }]
  })

  console.log('===> [OK] Create Hydrometer')

  return { addressData, hydrometerData }
}

const createConsumptionMarkings = async (
  hydrometerData: any,
  addressData: any,
) => {
  console.log('===> [START] Create Consumption Markings')

  const TOTAL_OF_CONSUMPTION_MARKINGS = process.argv[2]
    ? Number(process.argv[2])
    : 48

  console.log('=> TOTAL_OF_CONSUMPTION_MARKINGS', TOTAL_OF_CONSUMPTION_MARKINGS)

  const FIRST_DAY_OF_THE_YEAR = new Date(2023, 0, 1, 0)
  const LAST_HOUR_OF_THE_DAY_TO_COMPARE = 21

  const consumptionMarkings = []

  let sumOfHours = 0
  let consumptionSum = 0

  for (let i = 0; i < TOTAL_OF_CONSUMPTION_MARKINGS; i++) {
    const markingDate = addHours(FIRST_DAY_OF_THE_YEAR, sumOfHours)

    if (
      isLastDayOfMonth(markingDate)
      && markingDate.getHours() === LAST_HOUR_OF_THE_DAY_TO_COMPARE
    ) {
      consumptionSum = 0
    }

    const newConsumptionValue = Number(Math.random().toFixed(1)) * 10 * 2

    consumptionSum += newConsumptionValue

    const consumptionMarkingData = {
      id: faker.string.uuid(),
      hydrometer_id: hydrometerData.id,
      consumption: newConsumptionValue,
      monetary_value: calculateConsumptionMonetaryByCity({
        city: addressData,
        consumption_category: hydrometerData.consumption_category,
        consumption: consumptionSum,
      }),
      created_at: markingDate
    }

    sumOfHours += 1

    consumptionMarkings.push(consumptionMarkingData)
  }

  await prismaClient.consumptionMarkings.createMany({ data: consumptionMarkings })

  console.log('===> [OK] Create Consumption Markings')

  return { consumptionMarkings }
}

const sendToDataBase = async () => {
  await createCitiesAndConsumptionConversions()

  const { customerData } = await createCustomer()

  const { hydrometerData, addressData } = await createHydrometer(customerData)

  await createConsumptionMarkings(hydrometerData, addressData)
}

sendToDataBase()
