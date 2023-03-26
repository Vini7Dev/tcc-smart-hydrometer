type AccountType = 'ADMIN' | 'CUSTOMER'

export interface ICreateUserDTO {
  name: string
  email: string
  password: string
  avatar_file?: string
  account_type: AccountType
}
