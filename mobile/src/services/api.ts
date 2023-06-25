import axios from 'axios'
import { API_BASE_URL_V1 } from '../utils/constants'

export const api = axios.create({
  baseURL: API_BASE_URL_V1,
})
