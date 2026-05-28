<template>
  <div class="sidebar-view">
    <div class="logo-container">
      <img src="@/assets/icons/logo.png" class="logo" />
      <h2>后台管理平台</h2>
    </div>
    <el-menu
      router
      :default-active="$route.path"
      background-color="rgb(3, 27, 51)"
      text-color="#fff"
      active-text-color="#409EFF"
    >
      <template v-for="item in getDataWithIcon(data)" :key="item.label">
        <el-menu-item v-if="!item.children" :index="item.path">
          <el-icon v-if="item.icon" :size="17">
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="item.path">
          <template #title>
            <el-icon v-if="item.icon" :size="17">
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.label }}</span>
          </template>
          <template v-for="child in item.children" :key="child.label">
            <el-menu-item :index="child.path">{{ child.label }}</el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import {
  HomeFilled,
  Box,
  ShoppingCart,
  DataLine,
  Setting,
  User,
  Operation,
} from '@element-plus/icons-vue'

const iconMap = {
  首页: HomeFilled,
  系统管理: Setting,
  商品管理: Box,
  订单管理: ShoppingCart,
  数据中心: DataLine,
  个人中心: User,
  系统设置: Operation,
}

const data = [
  {
    label: '首页',
    path: '/home',
  },
  {
    label: '系统管理',
    children: [
      {
        label: '用户管理',
        path: '/user',
      },
      {
        label: '角色管理',
        path: '/role',
      },
      {
        label: '菜单管理',
        path: '/menu',
      },
      {
        label: '部门管理',
        path: '/dept',
      },
    ],
  },
  {
    label: '日志管理',
    path: '/log',
  },
  {
    label: '个人中心',
    path: '/profile',
  },
  {
    label: '系统设置',
    children: [
      {
        label: '主题设置',
      },
      {
        label: '操作日志',
      },
      {
        label: '登陆日志',
      },
    ],
  },
]
const getDataWithIcon = (data) => {
  data.forEach((item) => {
    if (iconMap[item.label]) {
      item.icon = iconMap[item.label]
    }
  })
  return data
}
</script>

<style lang="scss" scoped>
.sidebar-view {
  width: 100%;
  height: 100%;
  background-color: rgb(3, 27, 51);
  .logo-container {
    display: flex;
    align-items: center;
    padding: 20px;
    .logo {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    h2 {
      white-space: nowrap;
      font-size: 18px;
      color: #fff;
    }
  }
  :deep(.el-menu) {
    border-right: none !important; //element-plus 2.3.0版本后，el-menu组件增加了border-right属性，导致侧边栏出现右边框，这里通过覆盖样式去掉右边框
  }
}
</style>
