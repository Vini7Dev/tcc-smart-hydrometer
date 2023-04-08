import { ICreateHydrometerDTO } from '@modules/hydrometers/dtos/ICreateHydrometerDTO';
import { IListHydrometersDTO } from '@modules/hydrometers/dtos/IListHydrometersDTO';
import { IUpdateHydrometerDTO } from '@modules/hydrometers/dtos/IUpdateHydrometerDTO';
import { IHydrometersRepository } from '@modules/hydrometers/repositories/IHydrometersRepository';
import { AppRepository } from '@shared/infra/prisma/repositories/AppRepository'
import { Hydrometer } from '../entities/Hydrometer';

const LIST_FIRST_PAGE = 0
const LIST_DEFAULT_PER_PAGE = 10

export class HydrometersRepository extends AppRepository implements IHydrometersRepository {
  public async findById(id: string): Promise<Hydrometer | null> {
    const findedHydrometer = await this.client.hydrometers.findFirst({
      where: { id }
    })

    return findedHydrometer
  }

  public async findByName(name: string): Promise<Hydrometer | null> {
    const findedHydrometer = await this.client.hydrometers.findFirst({
      where: { name }
    })

    return findedHydrometer
  }

  public async list({
    page = LIST_FIRST_PAGE,
    perPage = LIST_DEFAULT_PER_PAGE,
    user_id,
  }: IListHydrometersDTO): Promise<Hydrometer[]> {
    const filters = user_id ? { user_id } : {}

    const hydrometerList = await this.client.hydrometers.findMany({
      skip: page,
      take: perPage,
      where: filters
    })

    return hydrometerList
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
    address,
  }: IUpdateHydrometerDTO): Promise<Hydrometer> {
    const payload = {
      id,
      name,
      password,
      consumption_category,
      user: {
        connect: { id: user_id }
      },
    }

    if (address) {
      if (address.id) {
        Object.assign(payload, {
          address: {
            update: { ...address },
          },
        })
      } else {
        Object.assign(payload, {
          address: {
            create: { ...address },
          },
        })
      }
    }

    const createdHydrometer = await this.client.hydrometers.update({
      where: { id },
      data: { ...payload },
    })

    return createdHydrometer
  }
}
