import { ICreateHydrometerDTO } from '../dtos/ICreateHydrometerDTO'
import { Hydrometer } from '../infra/prisma/entities/Hydrometer'

export interface IHydrometersRepository{
  create(data: ICreateHydrometerDTO): Promise<Hydrometer>
}
