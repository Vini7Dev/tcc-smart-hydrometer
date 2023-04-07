import { ICreateHydrometerDTO } from '@modules/hydrometers/dtos/ICreateHydrometerDTO';
import { IUpdateHydrometerDTO } from '@modules/hydrometers/dtos/IUpdateHydrometerDTO';
import { IHydrometersRepository } from '@modules/hydrometers/repositories/IHydrometersRepository';
import { AppRepository } from '@shared/infra/prisma/repositories/AppRepository'
import { Hydrometer } from '../entities/Hydrometer';

export class HydrometersRepository extends AppRepository implements IHydrometersRepository {
  public async findByName(name: string): Promise<Hydrometer | null> {
    const findedHydrometer = await this.client.hydrometers.findFirst({
      where: { name }
    })

    return findedHydrometer
  }

  public async create({
    user_id,
    name,
    password,
    consumption_category,
  }: ICreateHydrometerDTO): Promise<Hydrometer> {
    const createdHydrometer = await this.client.hydrometers.create({
      data: {
        user_id,
        name,
        password,
        consumption_category,
      }
    })


    return createdHydrometer
  }

  public async update({
    id,
    user_id,
    name,
    password,
    consumption_category,
  }: IUpdateHydrometerDTO): Promise<Hydrometer> {
    const createdHydrometer = await this.client.hydrometers.update({
      where: { id },
      data: {
        user_id,
        name,
        password,
        consumption_category,
      },
    })


    return createdHydrometer
  }
}
