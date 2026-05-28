const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
function randomStr(min, max) {
  const length = rand(min, max)
  return Array.from({ length: length }, () => chars[rand(0, chars.length - 1)]).join('')
}

const fullNameList = ['周', '吴', '郑', '王', '李', '秦']
function randomFullName() {
  return fullNameList[rand(0, fullNameList.length - 1)]
}

function randomDateTime() {
  return `2026-05-${String(rand(1, 31)).padStart(2, '0')}
  ${String(rand(0, 23)).padStart(2, '0')}:
  ${String(rand(0, 59)).padStart(2, '0')}:
  ${String(rand(0, 59)).padStart(2, '0')}`
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const logList = Array.from({ length: 60 }, (_, i) => ({
  log_id: `6${String(i + 1).padStart(6, '0')}`,
  log_code: `LOG${String(i + 1).padStart(6, '0')}`,
  operator: randomFullName() + randomStr(2, 4),
  operate_module: randomStr(6, 10), //操作模块
  log_type: rand(1, 9), //日志类型
  request_method: ['GET', 'POST', 'PUT', 'DELETE'][rand(0, 3)], //请求方式
  ip: `192.168.1.${rand(1, 254)}`, //IP地址
  cost: `${rand(100, 1000)}ms`, //耗时
  status: Math.random() > 0.3 ? 1 : 0,
  create_time: randomDateTime(),
}))

export default [
  {
    url: '/api/log/list',
    method: 'get',
    response: ({ query }) => {
      const { operator, log_type, status, start_time, end_time, page = 1, pageSize = 10 } = query
      let tempList = [...logList]
      if (operator) {
        tempList = tempList.filter((item) => item.operator.includes(operator))
      }
      if (log_type !== undefined && log_type !== '') {
        tempList = tempList.filter((item) => item.log_type === Number(log_type))
      }
      if (status !== undefined && status !== '') {
        tempList = tempList.filter((item) => item.status === Number(status))
      }
      if (start_time && end_time) {
        const start = new Date(start_time).getTime()
        const end = new Date(end_time).getTime()
        tempList = tempList.filter((item) => {
          const time = new Date(item.create_time).getTime()
          return time >= start && time <= end
        })
      }
      return {
        code: 200,
        data: {
          list: tempList.slice((page - 1) * pageSize, page * pageSize),
          total: tempList.length,
        },
      }
    },
  },
  {
    url: '/api/log/add',
    method: 'post',
    response: ({ body }) => {
      const newLog = {
        log_id: `600000${logList.length}`,
        create_time: new Date().toLocaleString(),
        ...body,
      }
      logList.unshift(newLog)
      return {
        code: 200,
        message: '新增成功',
        data: newLog,
      }
    },
  },
  {
    url: '/api/log/edit',
    method: 'put',
    response: ({ body }) => {
      const { log_id } = body
      const index = logList.findIndex((item) => item.log_id === log_id)
      if (index !== -1) {
        logList[index] = { ...logList[index], ...body }
        return {
          code: 200,
          message: '更新成功',
          data: logList[index],
        }
      }
    },
  },
  {
    url: '/api/log/delete',
    method: 'delete',
    response: ({ body }) => {
      const { log_ids } = body
      for (let i = logList.length - 1; i >= 0; i--) {
        if (log_ids.includes(logList[i].log_id)) {
          logList.splice(i, 1)
        }
      }
      return {
        code: 200,
        message: '删除成功',
      }
    },
  },
]
