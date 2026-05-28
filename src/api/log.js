import request from '@/utils/request.js'

export const getLogList = (params) => {
  return request.get('/log/list', { params })
}

export const addLog = (data) => {
  return request.post('/log/add', data)
}

export const editLog = (data) => {
  return request.put('/log/edit', data)
}

export const deleteLog = (log_ids) => {
  return request.delete('/log/delete', { data: { log_ids } })
}
