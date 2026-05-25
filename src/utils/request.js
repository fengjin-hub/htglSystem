import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
})

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = token
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
