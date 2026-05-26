import request from '@/utils/request.js'

export const getRoleList = (params) => {
  return request.get('/role/list', { params })
}

export const addRole = (data) => {
  return request.post('/role/add', data)
}

export const editRole = (data) => {
  return request.put('/role/edit', data)
}

export const deleteRole = (role_ids) => {
  return request.delete('/role/delete', { data: { role_ids } })
}
