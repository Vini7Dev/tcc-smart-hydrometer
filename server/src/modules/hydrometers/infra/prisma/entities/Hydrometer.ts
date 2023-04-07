import { ConsumptionCategory } from '@prisma/client'

import { Address } from './Address'

export class Hydrometer {
  public id: string

  public user_id: string | null

  public address_id: string | null

  public name: string

  public password: string

  public consumption_category: ConsumptionCategory

  public created_at: Date

  public updated_at: Date

  public address?: Address
}
