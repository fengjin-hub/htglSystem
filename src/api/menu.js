import request from '@/utils/request.js'

export const getMenuList = (params) => {
  return request.get('/menu/list', { params })
}

export const addMenu = (data) => {
  return request.post('/menu/add', data)
}

export const editMenu = (data) => {
  return request.put('/menu/edit', data)
}

export const deleteMenu = (menu_ids) => {
  return request.delete('/menu/delete', { data: { menu_ids } })
}
