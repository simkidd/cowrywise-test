import axios from 'axios'
import { environments } from '../utils/environments'

const API_KEY = environments.UNSPLASH_ACCESS_KEY
const BASE_URL = 'https://api.unsplash.com'

const baseApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Client-ID ${API_KEY}`,
  },
})

export default baseApi
