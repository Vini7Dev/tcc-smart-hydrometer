import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

export const api = axios.create({
  API_BASE_URL: API_BASE_URL,
  headers: {
    'Content-type': 'application/json'
  }
})
