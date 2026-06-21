function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomDateTime() {
  return `2026-05-${String(rand(1, 31)).padStart(2, '0')}
  ${String(rand(0, 23)).padStart(2, '0')}:
  ${String(rand(0, 59)).padStart(2, '0')}:
  ${String(rand(0, 59)).padStart(2, '0')}`
}

const menuList = [
  {
    menu_id: '300001',
    parent_id: null,
    menu_name: '首页',
    menu_type: 2,
    icon: 'House',
    path: '/home',
    component_path: '/home',
    permission: 'home:list',
    sort: 1,
    status: 1,
    create_time: randomDateTime(),
    children: [],
  },
  {
    menu_id: '300002',
    parent_id: null,
    menu_name: '系统管理',
    menu_type: 1,
    icon: 'Setting',
    path: '/system',
    component_path: '',
    permission: '',
    sort: 2,
    status: 1,
    create_time: randomDateTime(),
    children: [
      {
        menu_id: '300003',
        parent_id: '300002',
        menu_name: '用户管理',
        menu_type: 2,
        icon: 'User',
        path: '/system/user',
        component_path: '/system/user',
        permission: 'user:list',
        sort: 1,
        status: 1,
        create_time: randomDateTime(),
        children: [
          {
            menu_id: '300004',
            parent_id: '300003',
            menu_name: '新增用户',
            menu_type: 3,
            icon: '',
            path: '',
            component_path: '',
            permission: 'user:add',
            sort: 1,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
          {
            menu_id: '300005',
            parent_id: '300003',
            menu_name: '修改用户',
            menu_type: 3,
            icon: '',
            path: '',
            component_path: '',
            permission: 'user:edit',
            sort: 2,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
          {
            menu_id: '300006',
            parent_id: '300003',
            menu_name: '删除用户',
            menu_type: 3,
            icon: '',
            path: '',
            component_path: '',
            permission: 'user:delete',
            sort: 3,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
        ],
      },
      {
        menu_id: '300007',
        parent_id: '300002',
        menu_name: '角色管理',
        menu_type: 2,
        icon: 'Avatar',
        path: '/system/role',
        component_path: '/system/role',
        permission: 'role:list',
        sort: 2,
        status: 1,
        create_time: randomDateTime(),
        children: [
          {
            menu_id: '300008',
            parent_id: '300007',
            menu_name: '新增角色',
            menu_type: 3,
            icon: '',
            path: '',
            component_path: '',
            permission: 'role:add',
            sort: 1,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
          {
            menu_id: '300009',
            parent_id: '300007',
            menu_name: '修改角色',
            menu_type: 3,
            icon: '',
            path: '',
            component_path: '',
            permission: 'role:edit',
            sort: 2,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
          {
            menu_id: '300010',
            parent_id: '300007',
            menu_name: '删除角色',
            menu_type: 3,
            icon: '',
            path: '',
            component_path: '',
            permission: 'role:delete',
            sort: 3,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
        ],
      },
      {
        menu_id: '300011',
        parent_id: '300002',
        menu_name: '菜单管理',
        menu_type: 2,
        icon: 'Menu',
        path: '/system/menu',
        component_path: '/system/menu',
        permission: 'menu:list',
        sort: 3,
        status: 1,
        create_time: randomDateTime(),
        children: [
          {
            menu_id: '300012',
            parent_id: '300011',
            menu_name: '新增菜单',
            menu_type: 3,
            icon: '',
            path: '',
            component_path: '',
            permission: 'menu:add',
            sort: 1,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
          {
            menu_id: '300013',
            parent_id: '300011',
            menu_name: '修改菜单',
            menu_type: 3,
            icon: '',
            path: '',
            component_path: '',
            permission: 'menu:edit',
            sort: 2,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
          {
            menu_id: '300014',
            parent_id: '300011',
            menu_name: '删除菜单',
            menu_type: 3,
            icon: '',
            path: '',
            component_path: '',
            permission: 'menu:delete',
            sort: 3,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
        ],
      },
      {
        menu_id: '300015',
        parent_id: '300002',
        menu_name: '部门管理',
        menu_type: 2,
        icon: 'OfficeBuilding',
        path: '/system/dept',
        component_path: '/system/dept',
        permission: 'dept:list',
        sort: 4,
        status: 1,
        create_time: randomDateTime(),
        children: [
          {
            menu_id: '300016',
            parent_id: '300015',
            menu_name: '新增部门',
            menu_type: 3,
            icon: '',
            path: '',
            component_path: '',
            permission: 'dept:add',
            sort: 1,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
          {
            menu_id: '300017',
            parent_id: '300015',
            menu_name: '修改部门',
            menu_type: 3,
            icon: '',
            path: '',
            permission: 'dept:edit',
            sort: 2,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
          {
            menu_id: '300018',
            parent_id: '300015',
            menu_name: '删除部门',
            menu_type: 3,
            icon: '',
            path: '',
            permission: 'dept:delete',
            sort: 3,
            status: 1,
            create_time: randomDateTime(),
            children: [],
          },
        ],
      },
    ],
  },
  {
    menu_id: '300028',
    parent_id: null,
    menu_name: '日志管理',
    menu_type: 2,
    icon: 'Document',
    path: '/log',
    component_path: '/log',
    permission: 'log:list',
    sort: 3,
    status: 1,
    create_time: randomDateTime(),
    children: [
      {
        menu_id: '300064',
        parent_id: '3000018',
        menu_name: '删除日志',
        menu_type: 3,
        icon: '',
        path: '',
        component_path: '',
        permission: 'log:delete',
        sort: 3,
        status: 1,
        create_time: randomDateTime(),
        children: [],
      },
    ],
  },
  {
    menu_id: '300019',
    parent_id: null,
    menu_name: '个人中心',
    menu_type: 2,
    icon: 'UserFilled',
    path: '/profile',
    component_path: '/profile',
    permission: 'profile:list',
    sort: 4,
    status: 1,
    create_time: randomDateTime(),
    children: [],
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

function findMenu(list, menu_id) {
  for (const item of list) {
    if (item.menu_id === menu_id) {
      return item
    }
    const child = findMenu(item.children || [], menu_id)
    if (child) {
      return child
    }
  }
  return null
}

function updateMenu(list, menu) {
  return list.some((item, index) => {
    if (item.menu_id === menu.menu_id) {
      list[index] = {
        ...item,
        ...menu,
        children: item.children || [],
      }
      if (item.parent_id !== menu.parent_id) {
        const [removed] = list.splice(index, 1)
        if (menu.parent_id) {
          const newParent = findMenu(menuList, menu.parent_id)
          if (newParent) {
            newParent.children = newParent.children || []
            newParent.children?.unshift(removed)
          }
        } else {
          menuList.unshift(removed)
        }
      }
      return true
    }
    return updateMenu(item.children || [], menu)
  })
}

function removeMenus(list, menu_ids) {
  for (let i = list.length - 1; i >= 0; i--) {
    if (menu_ids.includes(list[i].menu_id)) {
      list.splice(i, 1)
    } else {
      removeMenus(list[i].children || [], menu_ids)
    }
  }
}

export default [
  {
    url: '/api/menu/list',
    method: 'get',
    response: ({ query }) => {
      const { menu_name, menu_type, status, start_time, end_time } = query
      let tempList = sortTree([...menuList])

      tempList = filterTree(tempList, (item) => {
        const matchName = menu_name ? item.menu_name.includes(menu_name) : true
        const matchType =
          menu_type !== undefined && menu_type !== '' ? item.menu_type === Number(menu_type) : true
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
    url: '/api/menu/add',
    method: 'post',
    response: ({ body }) => {
      const parent_id = body.parent_id || null
      const newMenu = {
        menu_id: `333${String(flattenTree(menuList).length + 1).padStart(6, '9')}`,
        create_time: new Date().toLocaleString(),
        children: [],
        ...body,
      }

      if (parent_id) {
        const parent = findMenu(menuList, parent_id)
        if (parent) {
          parent.children = parent.children || []
          parent.children.unshift(newMenu)
        }
      } else {
        menuList.unshift(newMenu)
      }

      return {
        code: 200,
        message: '新增成功',
        data: newMenu,
      }
    },
  },
  {
    url: '/api/menu/edit',
    method: 'put',
    response: ({ body }) => {
      const { menu_id } = body
      const isUpdated = updateMenu(menuList, body)
      if (isUpdated) {
        return {
          code: 200,
          message: '更新成功',
          data: findMenu(menuList, menu_id),
        }
      }
    },
  },
  {
    url: '/api/menu/delete',
    method: 'delete',
    response: ({ body }) => {
      const { menu_ids } = body
      removeMenus(menuList, menu_ids)

      return {
        code: 200,
        message: '删除成功',
      }
    },
  },
  //登录获取菜单信息
  {
    url: '/api/user/info',
    method: 'get',
    response: ({ headers }) => {
      const token = headers.authorization
      if (token === 'admin-token') {
        return {
          code: 200,
          data: {
            userInfo: {
              nickname: '管理员',
              role_name: '管理员',
              user_name: 'admin',
              phone_number: '13587479864',
              sex: 1,
              dept_name: '技术部',
              email: 'admin@gmail.com',
              create_time: randomDateTime(),
            },
            roles: ['admin'],
            menus: menuList,
          },
        }
      } else if (token === 'test-token') {
        return {
          code: 200,
          data: {
            userInfo: {
              nickname: '测试员',
              role_name: '测试员',
              user_name: 'test',
              phone_number: '15789064586',
              sex: 0,
              dept_name: '测试组',
              email: 'test@gmail.com',
              create_time: randomDateTime(),
            },
            roles: ['test'],
            menus: [menuList.at(0), menuList.at(-1)],
          },
        }
      }
    },
  },
]
