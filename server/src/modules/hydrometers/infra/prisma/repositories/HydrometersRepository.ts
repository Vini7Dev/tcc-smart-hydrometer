import { ICreateHydrometerDTO } from '@modules/hydrometers/dtos/ICreateHydrometerDTO';
import { IHydrometersRepository } from '@modules/hydrometers/repositories/IHydrometersRepository';
import { AppRepository } from '@shared/infra/prisma/repositories/AppRepository'
import { Hydrometer } from '../entities/Hydrometer';

export class HydrometersRepository extends AppRepository implements IHydrometersRepository {
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
}
