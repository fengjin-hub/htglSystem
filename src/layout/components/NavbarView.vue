<template>
  <div class="navbar-view">
    <div class="nav-left">
      <el-icon style="vertical-align: middle; margin-right: 10px">
        <Expand />
      </el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/sdsd' }">首r页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/sdsdsdsd' }">首页e</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/sdsdsdsd' }">首rrer页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav-right">
      <el-icon style="margin-right: 20px" :size="20">
        <Search />
      </el-icon>
      <el-icon style="margin-right: 20px" :size="20">
        <FullScreen />
      </el-icon>
      <el-icon style="margin-right: 20px" :size="20">
        <Bell />
      </el-icon>

      <el-dropdown ref="dropDownRef" trigger="click">
        <div style="display: inline-flex; align-items: center; cursor: pointer">
          <el-avatar :size="30" style="margin-right: 5px" @click="handleDropDown" />
          管理员
          <el-icon :size="12">
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="切换账号"
                placement="left-start"
                :hide-after="0"
                >Action 1</el-tooltip
              >
            </el-dropdown-item>
            <el-dropdown-item>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="切换账号"
                placement="left-start"
                :hide-after="0"
                >Action 2</el-tooltip
              >
            </el-dropdown-item>
            <el-dropdown-item style="color: red" @click="handleLogout"> 退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { Expand, Search, FullScreen, Bell, ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { removeToken } from '@/utils/auth'

const router = useRouter()
const dropDownRef = ref()

const handleDropDown = () => {
  dropDownRef.value.handleOpen()
}

const handleLogout = () => {
  // 这里可以执行退出登录的逻辑，例如清除用户信息、重置路由等
  removeToken()

  router.push('/login')
}
</script>

<style lang="scss" scoped>
.navbar-view {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #eee;

  .nav-left {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .nav-right {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
