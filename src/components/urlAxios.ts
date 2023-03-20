import axios from 'axios'

export const UrlAxios = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {}
})
