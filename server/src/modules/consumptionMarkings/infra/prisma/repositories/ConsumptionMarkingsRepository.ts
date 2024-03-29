import { ICreateConsumptionMarkingDTO } from '@modules/consumptionMarkings/dtos/ICreateConsumptionMarkingDTO'
import { IListConsumptionMarkingsDTO } from '@modules/consumptionMarkings/dtos/IListConsumptionMarkingsDTO'
import { IConsumptionMarkingsRepository } from '@modules/consumptionMarkings/repositories/IConsumptionMarkingsRepository'
import { AppRepository } from '@shared/infra/prisma/repositories/AppRepository'
import { ConsumptionMarking } from '../entities/ConsumptionMarking'

const LIST_FIRST_PAGE = 0
const LIST_DEFAULT_PER_PAGE = 17568

export class ConsumptionMarkingsRepository extends AppRepository implements IConsumptionMarkingsRepository {
  public async list({
    hydrometer_id,
    marking_region,
    share_consumption,
    before_date,
    after_date,
    page = LIST_FIRST_PAGE,
    perPage = LIST_DEFAULT_PER_PAGE,
  }: IListConsumptionMarkingsDTO): Promise<ConsumptionMarking[]> {
    const filters = {
      hydrometer_id,
      marking_region,
      created_at: {
        gte: before_date,
        lte: after_date,
      }
    }

    const hydrometerFilters = {}

    if (share_consumption) {
      Object.assign(hydrometerFilters, { share_consumption })
    }

    const consumptionMarkingList = await this.client.consumptionMarkings.findMany({
      skip: page,
      take: perPage,
      where: {
        ...filters,
        hydrometer: {
          AND: hydrometerFilters,
        }
      },
      orderBy: { created_at: 'desc' },
    })

    return consumptionMarkingList as ConsumptionMarking[]
  }

  public async create({
    hydrometer_id,
    consumption,
    monetary_value,
    marking_region,
  }: ICreateConsumptionMarkingDTO): Promise<ConsumptionMarking> {
    const createdConsumptionMarking = await this.client.consumptionMarkings.create({
      data: {
        hydrometer_id,
        consumption,
        monetary_value,
        marking_region,
      }
    })

    return createdConsumptionMarking as ConsumptionMarking
  }
}
