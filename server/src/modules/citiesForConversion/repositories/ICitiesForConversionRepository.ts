import { ICreateCityForConversionDTO } from '../dtos/ICreateCityForConversionDTO'
import { CityForConversion } from '../infra/prisma/entities/CityForConversion'

export interface ICitiesForConversionRepository {
  findByName(name: string): Promise<CityForConversion | null>
  findByCode(code: number): Promise<CityForConversion | null>
  create(data: ICreateCityForConversionDTO): Promise<CityForConversion>
  delete(id: string): Promise<void>
}
