import { ICreateHydrometerDTO } from '../dtos/ICreateHydrometerDTO'
import { IUpdateHydrometerDTO } from '../dtos/IUpdateHydrometerDTO'
import { Hydrometer } from '../infra/prisma/entities/Hydrometer'

export interface IHydrometersRepository{
  findByName(name: string): Promise<Hydrometer | null>
  create(data: ICreateHydrometerDTO): Promise<Hydrometer>
  update(data: IUpdateHydrometerDTO): Promise<Hydrometer>
}
