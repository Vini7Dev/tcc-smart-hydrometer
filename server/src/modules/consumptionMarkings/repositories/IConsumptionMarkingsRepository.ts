import { ICreateConsumptionMarkingDTO } from '../dtos/ICreateConsumptionMarkingDTO'
import { IListConsumptionMarkingsDTO } from '../dtos/IListConsumptionMarkingsDTO'
import { ConsumptionMarking } from '../infra/prisma/entities/ConsumptionMarking'

export interface IConsumptionMarkingsRepository {
  list(filters: IListConsumptionMarkingsDTO): Promise<ConsumptionMarking[]>
  create(data: ICreateConsumptionMarkingDTO): Promise<ConsumptionMarking>
}
