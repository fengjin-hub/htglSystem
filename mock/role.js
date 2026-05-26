const userRoleList = [
  { name: '超级管理员', code: 'admin', data_permission: '全部数据权限' },
  { name: '系统管理员', code: 'system', data_permission: '全部数据权限' },
  { name: '运营管理员', code: 'operation', data_permission: '本部门及以下' },
  { name: '产品经理', code: 'product', data_permission: '自定义数据权限' },
  { name: '财务专员', code: 'finance', data_permission: '部门数据权限' },
  { name: '客服主管', code: 'service', data_permission: '本部门及以下' },
  { name: '测试角色', code: 'test', data_permission: '仅本人数据' },
  { name: '普通用户', code: 'common', data_permission: '仅本人数据' },
]

function randomDateTime() {
  return `2026-05-${String(rand(1, 31)).padStart(2, '0')}
  ${String(rand(0, 23)).padStart(2, '0')}:
  ${String(rand(0, 59)).padStart(2, '0')}:
  ${String(rand(0, 59)).padStart(2, '0')}`
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const roleList = Array.from({ length: userRoleList.length }, (_, i) => ({
  role_id: `2${String(i + 1).padStart(6, '0')}`,
  role_name: userRoleList[i % userRoleList.length].name,
  role_code: userRoleList[i % userRoleList.length].code,
  data_permission: userRoleList[i % userRoleList.length].data_permission,
  user_number: rand(1, 10),
  sort: i + 1,
  status: Math.random() > 0.3 ? 1 : 0,
  create_time: randomDateTime(),
}))

export default [
  {
    url: '/api/role/list',
    method: 'get',
    response: ({ query }) => {
      const { role_name, role_code, status, start_time, end_time, page = 1, pageSize = 10 } = query
      let tempList = [...roleList]
      if (role_name) {
        tempList = tempList.filter((item) => item.role_name.includes(role_name))
      }
      if (role_code) {
        tempList = tempList.filter((item) => item.role_code.includes(role_code))
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
      const sortedList = tempList.sort((a, b) => {
        return a.sort - b.sort
      })

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
    url: '/api/role/add',
    method: 'post',
    response: ({ body }) => {
      const newrole = {
        role_id: `011111${roleList.length}`,
        create_time: new Date().toLocaleString(),
        ...body,
      }
      roleList.unshift(newrole)
      return {
        code: 200,
        message: '新增成功',
        data: newrole,
      }
    },
  },
  {
    url: '/api/role/edit',
    method: 'put',
    response: ({ body }) => {
      const { role_id } = body
      const index = roleList.findIndex((item) => item.role_id === role_id)
      if (index !== -1) {
        roleList[index] = { ...roleList[index], ...body }
        return {
          code: 200,
          message: '更新成功',
          data: roleList[index],
        }
      }
    },
  },
  {
    url: '/api/role/delete',
    method: 'delete',
    response: ({ body }) => {
      const { role_ids } = body
      for (let i = roleList.length - 1; i >= 0; i--) {
        if (role_ids.includes(roleList[i].role_id)) {
          roleList.splice(i, 1)
        }
      }
      return {
        code: 200,
        message: '删除成功',
      }
    },
  },
]
