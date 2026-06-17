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
      <template v-for="item in userStore.menus" :key="item.menu_id">
        <el-menu-item v-if="!item.children.length" :index="item.path">
          <template #title>
            <el-icon v-if="item.icon" :size="17">
              <component :is="iconMap[item.icon]" />
            </el-icon>
            <span>{{ item.menu_name }}</span>
          </template>
        </el-menu-item>
        <el-sub-menu v-else :index="item.path">
          <template #title>
            <el-icon v-if="item.icon" :size="17">
              <component :is="iconMap[item.icon]" />
            </el-icon>
            <span>{{ item.menu_name }}</span>
          </template>
          <template v-for="child in item.children" :key="child.menu_id">
            <el-menu-item :index="child.path">
              <template #title>
                <el-icon v-if="child.icon" :size="17">
                  <component :is="iconMap[child.icon]" />
                </el-icon>
                <span>{{ child.menu_name }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import {
  House,
  Setting,
  User,
  Avatar,
  Menu,
  OfficeBuilding,
  Document,
  UserFilled,
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()

const iconMap = {
  House: House,
  Setting,
  User,
  Avatar,
  Menu,
  OfficeBuilding,
  Document,
  UserFilled,
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
