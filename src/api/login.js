import request from '@/utils/request.js'

export const login = (data) => {
  return request.post('/login', data)
}

export const getUserInfo = () => {
  return request.get('/user/info')
}
