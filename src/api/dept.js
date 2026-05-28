import request from '@/utils/request.js'

export const getDeptList = (params) => {
  return request.get('/dept/list', { params })
}

export const addDept = (data) => {
  return request.post('/dept/add', data)
}

export const editDept = (data) => {
  return request.put('/dept/edit', data)
}

export const deleteDept = (dept_ids) => {
  return request.delete('/dept/delete', { data: { dept_ids } })
}
