import { ICreateConsumptionMarkingDTO } from '@modules/consumptionMarkings/dtos/ICreateConsumptionMarkingDTO'
import { IListConsumptionMarkingsDTO } from '@modules/consumptionMarkings/dtos/IListConsumptionMarkingsDTO'
import { IConsumptionMarkingsRepository } from '@modules/consumptionMarkings/repositories/IConsumptionMarkingsRepository'
import { AppRepository } from '@shared/infra/prisma/repositories/AppRepository'
import { ConsumptionMarkings } from '../entities/ConsumptionMarkings'

const LIST_FIRST_PAGE = 0
const LIST_DEFAULT_PER_PAGE = 50

export class ConsumptionMarkingsRepository extends AppRepository implements IConsumptionMarkingsRepository {
  public async list({
    hydrometer_id,
    before_date,
    after_date,
    page = LIST_FIRST_PAGE,
    perPage = LIST_DEFAULT_PER_PAGE,
  }: IListConsumptionMarkingsDTO): Promise<ConsumptionMarkings[]> {
    const consumptionMarkingList = await this.client.consumptionMarkings.findMany({
      skip: page,
      take: perPage,
      where: {
        hydrometer_id,
        created_at: {
          gte: before_date,
          lte: after_date,
        },
      },
    })

    return consumptionMarkingList
  }

  public async create({
    hydrometer_id,
    consumption,
    monetary_value,
  }: ICreateConsumptionMarkingDTO): Promise<ConsumptionMarkings> {
    const createdConsumptionMarking = await this.client.consumptionMarkings.create({
      data: {
        hydrometer_id,
        consumption,
        monetary_value,
      }
    })

    return createdConsumptionMarking
  }
}
