import { ICreateConsumptionMarkingDTO } from '../dtos/ICreateConsumptionMarkingDTO'
import { IListConsumptionMarkingsDTO } from '../dtos/IListConsumptionMarkingsDTO'
import { ConsumptionMarkings } from '../infra/prisma/entities/ConsumptionMarkings'

export interface IConsumptionMarkingsRepository {
  list(filters: IListConsumptionMarkingsDTO): Promise<ConsumptionMarkings[]>
  create(data: ICreateConsumptionMarkingDTO): Promise<ConsumptionMarkings>
}
