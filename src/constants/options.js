import {
  HomeFilled,
  Setting,
  User,
  Avatar,
  Menu,
  OfficeBuilding,
  Document,
  UserFilled,
} from '@element-plus/icons-vue'

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

const parentMenuOptions = [
  { label: '无', value: 0 },
  { label: '系统管理', value: 1 },
  { label: '用户管理', value: 2 },
  { label: '角色管理', value: 3 },
  { label: '菜单管理', value: 4 },
]

const menuIconOptions = [
  { label: '主页', value: 'House', icon: HomeFilled },
  { label: '系统管理', value: 'Setting', icon: Setting },
  { label: '用户管理', value: 'User', icon: User },
  { label: '角色管理', value: 'Avatar', icon: Avatar },
  { label: '菜单管理', value: 'Menu', icon: Menu },
  { label: '部门管理', value: 'OfficeBuilding', icon: OfficeBuilding },
  { label: '日志管理', value: 'Document', icon: Document },
  { label: '用户中心', value: 'UserFilled', icon: UserFilled },
]

const logTypeOptions = [
  { label: '新增用户', value: 1 },
  { label: '修改权限', value: 2 },
  { label: '查询列表', value: 3 },
  { label: '登录失败', value: 4 },
  { label: '导出数据', value: 5 },
  { label: '登录失败', value: 6 },
  { label: '访问页面', value: 7 },
  { label: '上传失败', value: 8 },
  { label: '下载文件', value: 9 },
]

const operateStatusOptions = [
  { label: '成功', value: 1, className: 'enabled' },
  { label: '失败', value: 0, className: 'disabled' },
]

export {
  deptOptions,
  statusOptions,
  sexOptions,
  userRoleOptions,
  menuTypeOptions,
  parentMenuOptions,
  menuIconOptions,
  logTypeOptions,
  operateStatusOptions,
}
