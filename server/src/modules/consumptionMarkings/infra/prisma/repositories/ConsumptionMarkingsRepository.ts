import { ICreateConsumptionMarkingDTO } from '@modules/consumptionMarkings/dtos/ICreateConsumptionMarkingDTO'
import { IConsumptionMarkingsRepository } from '@modules/consumptionMarkings/repositories/IConsumptionMarkingsRepository'
import { AppRepository } from '@shared/infra/prisma/repositories/AppRepository'
import { ConsumptionMarkings } from '../entities/ConsumptionMarkings'

export class ConsumptionMarkingsRepository extends AppRepository implements IConsumptionMarkingsRepository {
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
