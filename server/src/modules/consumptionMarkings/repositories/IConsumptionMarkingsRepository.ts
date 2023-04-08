import { ICreateConsumptionMarkingDTO } from '../dtos/ICreateConsumptionMarkingDTO'
import { ConsumptionMarkings } from '../infra/prisma/entities/ConsumptionMarkings'

export interface IConsumptionMarkingsRepository {
  create(data: ICreateConsumptionMarkingDTO): Promise<ConsumptionMarkings>
}
