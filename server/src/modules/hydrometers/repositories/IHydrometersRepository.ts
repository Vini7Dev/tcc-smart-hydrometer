import { ICreateHydrometerDTO } from '../dtos/ICreateHydrometerDTO'
import { IListHydrometersDTO } from '../dtos/IListHydrometersDTO'
import { IUpdateHydrometerDTO } from '../dtos/IUpdateHydrometerDTO'
import { Hydrometer } from '../infra/prisma/entities/Hydrometer'

export interface IHydrometersRepository{
  findByName(name: string): Promise<Hydrometer | null>
  list(filters: IListHydrometersDTO): Promise<Hydrometer[]>
  create(data: ICreateHydrometerDTO): Promise<Hydrometer>
  update(data: IUpdateHydrometerDTO): Promise<Hydrometer>
}
