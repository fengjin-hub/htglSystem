import request from '@/utils/request.js'

export const getProfileLoginList = () => {
  return request.get('/profileLogin/list')
}
