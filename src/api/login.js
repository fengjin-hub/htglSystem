import request from '@/utils/request.js'

export const login = () => {
  return request.post('/login')
}

export const getUserInfo = () => {
  return request.get('/user/info')
}
