<template>
  <div class="tags-view-container">
    <div class="tag-item" v-for="tag in tags" :key="tag.path">
      {{ tag.title }}
      <el-icon :size="12" style="margin-left: 10px">
        <Close />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { Close } from '@element-plus/icons-vue'

const tags = [
  { title: '首页', path: '/home' },
  { title: '用户管理', path: '/users' },
]
</script>

<style lang="scss" scoped>
.tags-view-container {
  display: flex;
  align-items: center;
  height: 35px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  padding: 5px 8px;
  .tag-item {
    display: flex;
    align-items: center;
    margin-right: 5px;
    font-size: 12px;
    padding: 5px 8px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &:hover {
      background-color: rgb(31, 111, 254);

      color: white;
    }
    :deep(.el-icon) {
      border-radius: 50%;
      &:hover {
        background-color: white;
        color: red;
      }
    }
  }
}
</style>
