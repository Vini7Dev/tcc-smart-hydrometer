type AccountType = 'ADMIN' | 'CUSTOMER'

export interface IListUsersDTO {
  account_type?: AccountType
  page?: number
  perPage?: number
}
