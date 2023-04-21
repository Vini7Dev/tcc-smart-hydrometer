import { injectable, inject } from 'tsyringe'
import { addMonths } from 'date-fns'

import { HTTP_STATUS_CODE } from '@utils/constants'
import { IHashProvider } from '@shared/containers/providers/HashProvider/models/IHashProvider'
import { AppError } from '@shared/errors/AppError'
import { IConsumptionMarkingsRepository } from '@modules/consumptionMarkings/repositories/IConsumptionMarkingsRepository'
import { IHydrometersRepository } from '@modules/hydrometers/repositories/IHydrometersRepository'
import { ICitiesForConversionRepository } from '@modules/citiesForConversion/repositories/ICitiesForConversionRepository'
import { calculateConsumptionMonetaryByCity } from '@utils/calculateConsumptionMonetaryByCity'
import { format } from 'date-fns'

interface IUseCaseProps {
  hydrometer_id: number
  hydrometer_password: string
  consumption: number
}

const EMPTY_MONETARY_CONVERSION = -1
const INVALID_CREDENTIALS_ERROR = 'Invalid credentials!'
const THE_HYDROMETER_IS_NOT_ACTIVATED = 'The hydrometer is not activated!'
const FIRST_DAY_OF_MONTH = 0
const NEXT_MONTH = 1

@injectable()
export class CreateConsumptionMarkingUseCase {
  constructor (
    @inject('ConsumptionMarkingsRepository')
    private consumptionMarkingsRepository: IConsumptionMarkingsRepository,

    @inject('HydrometersRepository')
    private hydrometersRepository: IHydrometersRepository,

    @inject('CitiesForConversionRepository')
    private citiesForConversionRepository: ICitiesForConversionRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    hydrometer_id,
    hydrometer_password,
    consumption,
  }: IUseCaseProps) {
    const hydrometerToAssociate = await this.hydrometersRepository.findById(hydrometer_id)

    if (!hydrometerToAssociate) {
      throw new AppError(INVALID_CREDENTIALS_ERROR, HTTP_STATUS_CODE.UNAUTHORIZED)
    }

    const hydrometerPasswordMatch = await this.hashProvider.compareHash(
      hydrometer_password,
      hydrometerToAssociate.password
    )

    if (!hydrometerPasswordMatch) {
      throw new AppError(INVALID_CREDENTIALS_ERROR, HTTP_STATUS_CODE.UNAUTHORIZED)
    }

    if (!hydrometerToAssociate.user_id) {
      throw new AppError(THE_HYDROMETER_IS_NOT_ACTIVATED)
    }

    const { city: hydrometerAddress } = hydrometerToAssociate.address ?? { city: '' }

    const formattedCityName = hydrometerAddress.trim().toUpperCase()

    const hydrometerCity = await this.citiesForConversionRepository.findByName(
      formattedCityName
    )

    if (!hydrometerCity) {
      const createdConsumptionMarking = await this.consumptionMarkingsRepository.create({
        hydrometer_id: hydrometerToAssociate.id,
        consumption,
        monetary_value: EMPTY_MONETARY_CONVERSION,
      })

      return createdConsumptionMarking
    }

    const currentDate = new Date(format(new Date(), 'yyyy-MM-dd'))
    const firstDayOfMonth = new Date(currentDate.setDate(FIRST_DAY_OF_MONTH))
    const firstDayOfNextMonth = addMonths(firstDayOfMonth, NEXT_MONTH)

    const monthConsumptionMarkings = await this.consumptionMarkingsRepository.list({
      hydrometer_id: hydrometerToAssociate.id,
      before_date: firstDayOfMonth,
      after_date: firstDayOfNextMonth,
    })

    const sumOfMonthConsumption = monthConsumptionMarkings.reduce(
      (acc, curr) => acc + curr.consumption,
      0
    )

    const createdConsumptionMarking = await this.consumptionMarkingsRepository.create({
      hydrometer_id: hydrometerToAssociate.id,
      consumption,
      monetary_value: calculateConsumptionMonetaryByCity({
        city: hydrometerCity,
        consumption_category: hydrometerToAssociate.consumption_category,
        consumption: sumOfMonthConsumption + consumption,
      })
    })

    return createdConsumptionMarking
  }
}
