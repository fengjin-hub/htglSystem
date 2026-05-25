import request from '@/utils/request.js'

export const getUserList = (params) => {
  return request.get('/user/list', { params })
}

export const addUser = (data) => {
  return request.post('/user/add', data)
}

export const editUser = (data) => {
  return request.put('/user/edit', data)
}

export const deleteUser = (user_ids) => {
  return request.delete('/user/delete', { data: { user_ids } })
}
