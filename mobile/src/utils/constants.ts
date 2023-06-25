// API
export const API_BASE_URL = 'http://192.168.0.23:3333'
export const API_BASE_URL_V1 = `${API_BASE_URL}/v1`
export const API_FILES_URL = (filename: string) => `${API_BASE_URL}/files/${filename}`

// Account Type
export const ADMIN_ACCOUNT_TYPE = 'ADMIN'
export const CUSTOMER_ACCOUNT_TYPE = 'CUSTOMER'
