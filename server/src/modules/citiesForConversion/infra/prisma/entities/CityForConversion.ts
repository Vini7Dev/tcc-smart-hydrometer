import { CategoryForConversion } from './CategoryForConversion'

export class CityForConversion {
  public id: string

  public code: number

  public name: string

  public last_update: string

  public categoriesForConversion?: CategoryForConversion[]

  public created_at: Date

  public updated_at: Date
}
