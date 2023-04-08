type ConsumptionCategory = 'EMPTY'
  | 'COMMERCIAL_SOCIAL_ASSISTANCE'
  | 'COMMERCIAL_NORMAL'
  | 'INDUSTRIAL_NORMAL'
  | 'PUBLIC_WITH_PROGRAM_AGREEMENT'
  | 'PUBLIC_WITH_CONTRACT_PURE'
  | 'PUBLIC_NORMAL'
  | 'RESIDENTIAL_NORMAL'
  | 'RESIDENTIAL_SOCIAL'
  | 'RESIDENTIAL_VULNERABLE_NORMAL'

interface ICreateHydrometerAddressDTO {
  id?: string
  postal_code: string
  street: string
  number?: string
  neighborhood: string
  city: string
  state: string
}

export interface IUpdateHydrometerDTO {
  id: string
  user_id?: string
  name?: string
  password?: string
  consumption_category?: ConsumptionCategory
  address?: ICreateHydrometerAddressDTO
}
