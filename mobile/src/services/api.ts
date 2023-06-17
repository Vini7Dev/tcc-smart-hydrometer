import axios from 'axios'
import { BaseUrl } from '../utils/constants'

export const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-type': 'application/json'
  }
})
