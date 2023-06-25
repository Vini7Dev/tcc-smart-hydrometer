// API
export const API_BASE_URL = 'http://192.168.0.23:3333'
export const API_BASE_URL_V1 = `${API_BASE_URL}/v1`
export const API_FILES_URL = (filename: string) => `${API_BASE_URL}/files/${filename}`

export const MULTPART_FORM_DATA_HEADERS = {
    headers: { 'Content-Type': 'multipart/form-data' }
}

// Account Type
export const ADMIN_ACCOUNT_TYPE = 'ADMIN'
export const CUSTOMER_ACCOUNT_TYPE = 'CUSTOMER'

// Consumption Catergories
export const consumptionCategories = [
    { value: 'RESIDENTIAL_NORMAL', label: 'Residencial - Normal' },
    { value: 'RESIDENTIAL_SOCIAL', label: 'Residencial - Social' },
    { value: 'RESIDENTIAL_VULNERABLE_NORMAL', label: 'Residencial - Normal vulnerável' },
    { value: 'INDUSTRIAL_NORMAL', label: 'Industrial - Normal' },
    { value: 'COMMERCIAL_NORMAL', label: 'Comercial - Normal' },
    { value: 'COMMERCIAL_SOCIAL_ASSISTANCE', label: 'Comercial - Assistência social' },
    { value: 'PUBLIC_NORMAL', label: 'Público - Normal' },
    { value: 'PUBLIC_WITH_PROGRAM_AGREEMENT', label: 'Público - Com contrato de progama' },
    { value: 'PUBLIC_WITH_CONTRACT_PURE', label: 'Público - Com contrato puro' },
]
