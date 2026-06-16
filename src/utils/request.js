import axios from 'axios'
import { useUserStore } from '@/stores/modules/user'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
})

request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = userStore.token
  }

  return config
})

request.interceptors.response.use(
  (res) => {
    const responseData = res.data
    if (responseData.code !== 200) {
      return Promise.reject(responseData.message)
    }

    return responseData.data
  },
  (err) => {
    console.error('请求错误', err)
    return Promise.reject(err)
  },
)

export default request
