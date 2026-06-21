import request from '@/utils/request.js'

export const getLogList = (params) => {
  return request.get('/log/list', { params })
}

export const deleteLog = (log_ids) => {
  return request.delete('/log/delete', { data: { log_ids } })
}
