import axios from 'axios'
import { API_URL } from '../config.js'
const api = axios.create({ baseURL: API_URL })
api.interceptors.request.use(c=>{
  const t = localStorage.getItem('kss_token')
  if(t) c.headers.Authorization = `Bearer ${t}`
  return c
})
export default api
