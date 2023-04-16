import { ICreateCityForConversionDTO } from '@modules/citiesForConversion/dtos/ICreateCityForConversionDTO'
import { ICitiesForConversionRepository } from '@modules/citiesForConversion/repositories/ICitiesForConversionRepository'
import { AppRepository } from '@shared/infra/prisma/repositories/AppRepository'
import { CityForConversion } from '../entities/CityForConversion'

export class CitiesForConversionRepository extends AppRepository implements ICitiesForConversionRepository {
  public async findByCode(code: number): Promise<CityForConversion | null> {
    const findedCityForConversion = await this.client.citiesForConversion.findFirst({
      where: { code },
    })

    return findedCityForConversion
  }

  public async create({
    code,
    name,
    last_update,
    categoriesForConversion,
  }: ICreateCityForConversionDTO): Promise<CityForConversion> {
    const createdCityForConversion = await this.client.citiesForConversion.create({
      data: {
        code,
        name,
        last_update,
        categoriesForConversion: {
          create: categoriesForConversion.map(({
            category,
            consumptionConversions,
          }) => ({
            category: category,
            consumptionConversions: {
              create: consumptionConversions.map(({ rule, sewer_rate, water_rate }) => ({
                rule,
                sewer_rate,
                water_rate,
              }))
            }
          }))
        }
      }
    })

    return createdCityForConversion
  }

  public async delete(id: string): Promise<void> {
    await this.client.citiesForConversion.delete({
      where: { id },
    })
  }
}
