<template>
  <div class="info-card" v-for="item in props.data" :key="item.title">
    <el-icon class="info-icon" :size="40" :color="item.color" style="background-color: #e6f7ff">
      <component :is="item.icon" />
    </el-icon>
    <div class="info-item">
      <p class="info-title">{{ item.title }}</p>
      <p class="info-value">{{ item.value }}</p>
      <div class="data-change">
        <p style="white-space: nowrap">较昨日</p>
        <el-icon :size="14" :color="item.upDown === 'up' ? '#52c41a' : '#ff4d4f'">
          <component :is="item.upDown === 'up' ? Top : Bottom" />
        </el-icon>
        <p :class="item.upDown === 'up' ? 'up' : 'down'">1,234</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Top, Bottom } from '@element-plus/icons-vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.info-card {
  display: flex;
  align-items: center;
  width: 25%;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  .info-item {
    .info-title {
      font-size: 14px;
      color: #333;
    }
    .info-value {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }
    .data-change {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #888;
      gap: 3px;
      .up {
        color: #52c41a;
      }
      .down {
        color: #ff4d4f;
      }
    }
  }
  :deep(.el-icon[class~='info-icon']) {
    margin-right: 15px;
    padding: 8px;
    background-color: #e6f7ff;
    border-radius: 50%;
  }
}
</style>
