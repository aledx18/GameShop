import axios from 'axios'

export const UrlAxios = axios.create({
  // cambiar por localhost/3000
  baseURL: 'https://game-boost.vercel.app/api',
  headers: {}
})
