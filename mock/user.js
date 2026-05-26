const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
function randomStr(min, max) {
  const length = rand(min, max)
  return Array.from({ length: length }, () => chars[rand(0, chars.length - 1)]).join('')
}

const deptList = ['研发部', '销售部', '财务部', '运维部', '人事部', '后勤部']
function randomDept() {
  return deptList[rand(0, deptList.length - 1)]
}

function randomPhone() {
  return '13' + Array.from({ length: 9 }, () => rand(0, 9)).join('')
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

const userList = Array.from({ length: 60 }, (_, i) => ({
  user_id: `1${String(i + 1).padStart(6, '0')}`,
  user_name: randomStr(6, 10),
  sex: Math.random() > 0.5 ? 1 : 0,
  dept_name: randomDept(),
  phone_number: randomPhone(),
  status: Math.random() > 0.3 ? 1 : 0,
  create_time: randomDateTime(),
}))

export default [
  {
    url: '/api/user/list',
    method: 'get',
    response: ({ query }) => {
      const { user_name, status, dept_name, start_time, end_time, page = 1, pageSize = 10 } = query
      let tempList = [...userList]
      if (user_name) {
        tempList = tempList.filter((item) => item.user_name.includes(user_name))
      }
      if (status !== undefined && status !== '') {
        tempList = tempList.filter((item) => item.status === Number(status))
      }
      if (dept_name) {
        tempList = tempList.filter((item) => item.dept_name === dept_name)
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
    url: '/api/user/add',
    method: 'post',
    response: ({ body }) => {
      const newUser = {
        user_id: `100000${userList.length}`,
        create_time: new Date().toLocaleString(),
        ...body,
      }
      userList.unshift(newUser)
      return {
        code: 200,
        message: '新增成功',
        data: newUser,
      }
    },
  },
  {
    url: '/api/user/edit',
    method: 'put',
    response: ({ body }) => {
      const { user_id } = body
      const index = userList.findIndex((item) => item.user_id === user_id)
      if (index !== -1) {
        userList[index] = { ...userList[index], ...body }
        return {
          code: 200,
          message: '更新成功',
          data: userList[index],
        }
      }
    },
  },
  {
    url: '/api/user/delete',
    method: 'delete',
    response: ({ body }) => {
      const { user_ids } = body
      for (let i = userList.length - 1; i >= 0; i--) {
        if (user_ids.includes(userList[i].user_id)) {
          userList.splice(i, 1)
        }
      }
      return {
        code: 200,
        message: '删除成功',
      }
    },
  },
]
