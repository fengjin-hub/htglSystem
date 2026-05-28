const deptOptions = [
  { label: '研发部', value: '研发部' },
  { label: '销售部', value: '销售部' },
  { label: '财务部', value: '财务部' },
  { label: '运维部', value: '运维部' },
  { label: '人事部', value: '人事部' },
  { label: '后勤部', value: '后勤部' },
]

const statusOptions = [
  { label: '启用', value: 1, className: 'enabled' },
  { label: '禁用', value: 0, className: 'disabled' },
]

const sexOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 0 },
]

const userRoleOptions = [
  { label: '超级管理员', value: '超级管理员' },
  { label: '系统管理员', value: '系统管理员' },
  { label: '运营管理员', value: '运营管理员' },
  { label: '产品经理', value: '产品经理' },
  { label: '财务专员', value: '财务专员' },
  { label: '客服主管', value: '客服主管' },
  { label: '测试角色', value: '测试角色' },
  { label: '普通用户', value: '普通用户' },
]

const menuTypeOptions = [
  { label: '目录', value: 1, type: 'primary' },
  { label: '菜单', value: 2, type: 'success' },
  { label: '按钮', value: 3, type: 'warning' },
]

export { deptOptions, statusOptions, sexOptions, userRoleOptions, menuTypeOptions }
