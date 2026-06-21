<template>
  <section class="save-card">
    <h3>操作记录</h3>
    <el-table class="record-table" :data="data" style="width: 100%">
      <el-table-column prop="create_time" label="登录时间" width="180" />
      <el-table-column prop="login_adress" label="登录地点" width="180" />
      <el-table-column prop="ip" label="IP地址" width="180" />
      <el-table-column prop="device" label="设备" width="180" />
      <el-table-column prop="status" label="状态" width="180">
        <template #default="scope">
          <div class="status-wrap">
            <span class="status-dot" :class="[scope.row.status ? 'enabled' : 'disabled']" />
            <span>{{ scope.row.status ? '失败' : '成功' }} </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
})

const data = ref([])

watch(
  () => props.tableData,
  (val) => {
    data.value = val
  },
)
</script>

<style lang="scss" scoped>
.save-card {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  .record-table {
    min-height: 0;
    flex: 1;
    .status-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      .enabled {
        background: #67c23a;
      }

      .disabled {
        background: #f56c6c;
      }
    }
  }
}
</style>
