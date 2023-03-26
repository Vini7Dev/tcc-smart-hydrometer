import { AccountType } from '@prisma/client'

export class User {
  public id: string

  public name: string

  public email: string

  public password: string

  public avatar_file: string | null

  public account_type: AccountType

  public created_at: Date

  public updated_at: Date
}
