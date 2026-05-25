<template>
  <div class="sidebar-view">
    <div class="logo-container">
      <img src="@/assets/icons/logo.png" class="logo" />
      <h2>后台管理平台</h2>
    </div>
    <el-tree
      style="max-width: 600px"
      :data="getDataWithIcon(data)"
      :props="defaultProps"
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }">
        <span style="display: inline-flex; align-items: center">
          <el-icon :size="17" style="margin-right: 2px"><component :is="data.icon" /></el-icon>
          {{ node.data.label }}
        </span>
      </template>
    </el-tree>
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
import { shallowRef } from 'vue'

const iconMap = shallowRef({
  首页: HomeFilled,
  系统管理: Setting,
  商品管理: Box,
  订单管理: ShoppingCart,
  数据中心: DataLine,
  个人中心: User,
  系统设置: Operation,
})

const handleNodeClick = (data) => {
  console.log(data)
}

const data = [
  {
    label: '首页',
  },
  {
    label: '系统管理',
    children: [
      {
        label: '用户管理',
      },
      {
        label: '角色管理',
      },
      {
        label: '菜单管理',
      },
      {
        label: '部门管理',
      },
    ],
  },
  {
    label: '商品管理',
    children: [
      {
        label: '商品列表',
      },
      {
        label: '商品分类',
      },
      {
        label: '商品审核',
      },
    ],
  },
  {
    label: '订单管理',
    children: [
      {
        label: '订单列表',
      },
      {
        label: '退款管理',
      },
      {
        label: '物流管理',
      },
    ],
  },
  {
    label: '数据中心',
    children: [
      {
        label: '数据统计',
      },
      {
        label: '销售分析',
      },
      {
        label: '用户增长 ',
      },
    ],
  },
  {
    label: '个人中心',
    children: [
      {
        label: '个人信息',
      },
      {
        label: '修改密码',
      },
    ],
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
const defaultProps = {
  children: 'children',
  label: 'label',
}
</script>

<style lang="scss" scoped>
.sidebar-view {
  width: 240px;
  height: 100vh;
  background-color: rgb(3, 28, 50);
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  .logo-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .logo {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    h2 {
      font-size: 18px;
      color: #fff;
    }
  }
  :deep(.el-tree) {
    background-color: rgb(3, 27, 51);
    .el-tree-node {
      color: #fff;
    }
    .el-tree-node__content:hover {
      background-color: rgb(11, 52, 98);
    }

    .el-tree-node:focus > .el-tree-node__content {
      background-color: rgb(11, 52, 98);
      // color: rgb(49, 135, 249);
    }
  }
}
</style>
