import { CityForConversion } from '@modules/citiesForConversion/infra/prisma/entities/CityForConversion'
import { categoriesForConversionEnum } from './categoriesForConversionArray'

interface ICalculateConsumptionMonetaryByCityProps {
  city: CityForConversion
  consumption_category: keyof typeof categoriesForConversionEnum
  consumption: number
}

const EMPTY_MONETARY_CONVERSION = -1

const BETWEEN_VALUE_RULE = ' a '
const MORE_THAN_RULE = 'acima de '

export const calculateConsumptionMonetaryByCity = ({
  city,
  consumption_category,
  consumption,
}: ICalculateConsumptionMonetaryByCityProps): number => {
  const cityCategoryRules = city.categoriesForConversion?.find(categoryOfConversion => {
    return categoryOfConversion.category === categoriesForConversionEnum[consumption_category]
  })

  if (!cityCategoryRules) {
    return EMPTY_MONETARY_CONVERSION
  }

  let monetaryTotal = 0

  for (const consumptionConversion of cityCategoryRules.consumptionConversions) {
    if (consumptionConversion.rule.indexOf(BETWEEN_VALUE_RULE) !== -1) {
      const [
        minConsumpmition,
        maxConsumpmition,
      ] = consumptionConversion.rule.split(BETWEEN_VALUE_RULE)

      const minConsumpmitionNum = Number(minConsumpmition)
      const maxConsumpmitionNum = Number(maxConsumpmition)

      let ruleRangeInLiters = 0

      if (minConsumpmitionNum === 0) {
        ruleRangeInLiters = 1
      } else if (consumption >= minConsumpmitionNum && consumption > maxConsumpmitionNum) {
        ruleRangeInLiters = maxConsumpmitionNum - minConsumpmitionNum
      } else if (consumption >= minConsumpmitionNum && consumption <= maxConsumpmitionNum) {
        ruleRangeInLiters = consumption - minConsumpmitionNum
      }

      if (ruleRangeInLiters <= 0) {
        break
      }

      monetaryTotal += consumptionConversion.water_rate * ruleRangeInLiters
      monetaryTotal += consumptionConversion.sewer_rate * ruleRangeInLiters
    } else if (consumptionConversion.rule.indexOf(MORE_THAN_RULE) !== -1) {
      const [, minConsumpmition] = consumptionConversion.rule.split(MORE_THAN_RULE)

      const minConsumpmitionNum = Number(minConsumpmition)

      const ruleRangeInLiters = consumption - minConsumpmitionNum

      if (ruleRangeInLiters <= 0) {
        continue
      }

      monetaryTotal += consumptionConversion.water_rate * ruleRangeInLiters
      monetaryTotal += consumptionConversion.sewer_rate * ruleRangeInLiters
    }
  }

  return monetaryTotal
}
