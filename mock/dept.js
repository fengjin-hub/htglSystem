function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomPhone() {
  return '13' + Array.from({ length: 9 }, () => rand(0, 9)).join('')
}

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
function randomStr(min, max) {
  const length = rand(min, max)
  return Array.from({ length: length }, () => chars[rand(0, chars.length - 1)]).join('')
}
function randomDateTime() {
  return `2026-05-${String(rand(1, 31)).padStart(2, '0')}
  ${String(rand(0, 23)).padStart(2, '0')}:
  ${String(rand(0, 59)).padStart(2, '0')}:
  ${String(rand(0, 59)).padStart(2, '0')}`
}

const deptList = [
  {
    dept_id: '400001',
    parent_id: null,
    dept_name: '总公司',
    director: '张总',
    phone_number: randomPhone(),
    email: randomStr(6, 10) + '@163.com',
    member_sum: 235,
    sort: 1,
    status: 1,
    create_time: randomDateTime(),
    children: [
      {
        dept_id: '400012',
        parent_id: '400001',
        dept_name: '技术部',
        director: '李明',
        phone_number: randomPhone(),
        email: randomStr(6, 10) + '@163.com',
        member_sum: 65,
        sort: 1,
        status: 1,
        create_time: randomDateTime(),
        children: [
          {
            dept_id: '400113',
            parent_id: '400012',
            dept_name: '前端组',
            director: '王凯',
            phone_number: randomPhone(),
            email: randomStr(6, 10) + '@163.com',
            member_sum: 25,
            sort: 1,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
          {
            dept_id: '400114',
            parent_id: '400012',
            dept_name: '后端组',
            director: '周琦',
            phone_number: randomPhone(),
            email: randomStr(6, 10) + '@163.com',
            member_sum: 35,
            sort: 2,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
          {
            dept_id: '400115',
            parent_id: '400012',
            dept_name: '测试组',
            director: '孙高',
            phone_number: randomPhone(),
            email: randomStr(6, 10) + '@163.com',
            member_sum: 5,
            sort: 3,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
        ],
      },
      {
        dept_id: '400013',
        parent_id: '400001',
        dept_name: '产品组',
        director: '周武',
        phone_number: randomPhone(),
        email: randomStr(6, 10) + '@163.com',
        member_sum: 45,
        sort: 2,
        status: 1,
        create_time: randomDateTime(),
        children: [
          {
            dept_id: '400119',
            parent_id: '400013',
            dept_name: '产品一组',
            director: '高尔',
            phone_number: randomPhone(),
            email: randomStr(6, 10) + '@163.com',
            member_sum: 35,
            sort: 1,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
          {
            dept_id: '400120',
            parent_id: '400013',
            dept_name: '产品二组',
            director: '李潭',
            phone_number: randomPhone(),
            email: randomStr(6, 10) + '@163.com',
            member_sum: 10,
            sort: 2,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
        ],
      },
      {
        dept_id: '400014',
        parent_id: '400001',
        dept_name: '运营组',
        director: '李潭',
        phone_number: randomPhone(),
        email: randomStr(6, 10) + '@163.com',
        member_sum: 10,
        sort: 3,
        status: 1,
        create_time: randomDateTime(),
        children: [],
      },
      {
        dept_id: '400015',
        parent_id: '400001',
        dept_name: '财务部',
        director: '周洁',
        phone_number: randomPhone(),
        email: randomStr(6, 10) + '@163.com',
        member_sum: 20,
        sort: 4,
        status: 1,
        create_time: randomDateTime(),
        children: [
          {
            dept_id: '400410',
            parent_id: '400014',
            dept_name: '运营一组',
            director: '韩科',
            phone_number: randomPhone(),
            email: randomStr(6, 10) + '@163.com',
            member_sum: 10,
            sort: 1,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
          {
            dept_id: '400414',
            parent_id: '400040001401',
            dept_name: '运营二组',
            director: '小裤',
            phone_number: randomPhone(),
            email: randomStr(6, 10) + '@163.com',
            member_sum: 10,
            sort: 2,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
        ],
      },
    ],
  },
]

function sortTree(list) {
  return list
    .sort((a, b) => a.sort - b.sort)
    .map((item) => ({
      ...item,
      children: sortTree(item.children || []),
    }))
}

function filterTree(list, predicate) {
  return list.reduce((result, item) => {
    const children = filterTree(item.children || [], predicate)
    if (predicate(item) || children.length) {
      result.push({
        ...item,
        children,
      })
    }
    return result
  }, [])
}

function flattenTree(list) {
  return list.reduce((result, item) => {
    result.push(item)
    if (item.children && item.children.length) {
      result.push(...flattenTree(item.children))
    }
    return result
  }, [])
}

function findDept(list, dept_id) {
  for (const item of list) {
    if (item.dept_id === dept_id) {
      return item
    }
    const child = findDept(item.children || [], dept_id)
    if (child) {
      return child
    }
  }
  return null
}

function updateDept(list, dept) {
  return list.some((item, index) => {
    if (item.dept_id === dept.dept_id) {
      list[index] = {
        ...item,
        ...dept,
        children: item.children || [],
      }
      return true
    }
    return updateDept(item.children || [], dept)
  })
}

function removeDepts(list, dept_ids) {
  for (let i = list.length - 1; i >= 0; i--) {
    if (dept_ids.includes(list[i].dept_id)) {
      list.splice(i, 1)
    } else {
      removeDepts(list[i].children || [], dept_ids)
    }
  }
}

export default [
  {
    url: '/api/dept/list',
    method: 'get',
    response: ({ query }) => {
      const { dept_name, dept_type, status, start_time, end_time } = query
      let tempList = sortTree([...deptList])

      tempList = filterTree(tempList, (item) => {
        const matchName = dept_name ? item.dept_name.includes(dept_name) : true
        const matchType =
          dept_type !== undefined && dept_type !== '' ? item.dept_type === Number(dept_type) : true
        const matchStatus =
          status !== undefined && status !== '' ? item.status === Number(status) : true
        let matchTime = true

        if (start_time && end_time) {
          const start = new Date(start_time).getTime()
          const end = new Date(end_time).getTime()
          const time = new Date(item.create_time).getTime()
          matchTime = time >= start && time <= end
        }

        return matchName && matchType && matchStatus && matchTime
      })

      return {
        code: 200,
        data: {
          list: tempList,
          // total: flattenTree(tempList).length,
        },
      }
    },
  },
  {
    url: '/api/dept/add',
    method: 'post',
    response: ({ body }) => {
      const parent_id = body.parent_id || null
      const newDept = {
        dept_id: `4${String(flattenTree(deptList).length + 1).padStart(6, '0')}`,
        parent_id,
        dept_name: '',
        dept_type: 1,
        icon: '',
        path: '',
        component: '',
        permission: '',
        sort: flattenTree(deptList).length + 1,
        status: 1,
        create_time: new Date().toLocaleString(),
        children: [],
        ...body,
      }

      if (parent_id) {
        const parent = findDept(deptList, parent_id)
        if (parent) {
          parent.children = parent.children || []
          parent.children.unshift(newDept)
        }
      } else {
        deptList.unshift(newDept)
      }

      return {
        code: 200,
        message: '新增成功',
        data: newDept,
      }
    },
  },
  {
    url: '/api/dept/edit',
    method: 'put',
    response: ({ body }) => {
      const { dept_id } = body
      const isUpdated = updateDept(deptList, body)
      if (isUpdated) {
        return {
          code: 200,
          message: '更新成功',
          data: findDept(deptList, dept_id),
        }
      }
    },
  },
  {
    url: '/api/dept/delete',
    method: 'delete',
    response: ({ body }) => {
      const { dept_ids } = body
      removeDepts(deptList, dept_ids)

      return {
        code: 200,
        message: '删除成功',
      }
    },
  },
]
