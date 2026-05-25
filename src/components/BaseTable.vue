<template>
  <div class="table-contain">
    <div class="table-main">
      <el-table
        v-loading="loading"
        :data="tableData"
        highlight-current-row
        border
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        style="width: 100%"
        height="100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="columns.includes('selection')" type="selection" width="55" />
        <el-table-column
          v-for="item in props.columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template v-if="item.prop.includes('img')" #default>
            <img
              src="@/assets/images/login_bg.png"
              alt=""
              style="width: 40px; height: 40px; border-radius: 50%"
            />
          </template>
          <template v-else-if="item.labelReplace" #default>
            <span>{{ item.labelReplaceContent?.row[item.prop] }}</span>
          </template>
          <template v-else-if="item.prop === 'sex'" #default="{ row }">
            <span>{{ row.sex === 1 ? '男' : '女' }}</span>
          </template>
          <template v-else-if="item.label === '操作'" #default="scope">
            <el-button text type="primary" @click="handleEdit(scope.row)"> 编辑 </el-button>
            <el-button text type="danger" @click="handleDeleteOne(scope.row)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      v-model:current-page="query.page"
      v-model:page-size="query.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :size="size"
      :disabled="disabled"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="loadTableData"
      @current-change="loadTableData"
      class="pagination"
    />
  </div>
</template>

<script setup>
import { getUserList, deleteUser } from '@/api/user'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  tableData: {
    type: Object,
    default: () => ({ data: [], total: 0 }),
  },
  columns: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['edit'])

const tableData = ref([])
const loading = ref(false)
const total = ref(0)
const query = reactive({
  page: 1,
  pageSize: 10,
})
const selectedRows = ref([])

const handleEdit = (rowData) => {
  emit('edit', { mode: 'edit', data: rowData })
}

const handleSelectionChange = (rows) => {
  // 处理多选框选中变化的逻辑
  selectedRows.value = rows
}

const handleDeleteOne = async (row) => {
  await deleteUser([row.user_id])
  loadTableData()
  ElMessage.success(`用户【${row.user_name}】删除成功`)
}

const handleDeleteMultiple = async () => {
  if (selectedRows.value.length > 0) {
    const user_ids = selectedRows.value.map((row) => row.user_id)
    const user_names = selectedRows.value.map((row) => row.user_name)
    await deleteUser(user_ids)
    loadTableData()
    ElMessage.success(`用户【${user_names.join('、')}】等删除成功`)
  } else {
    ElMessage.warning('请至少选择一个用户进行删除')
  }
}

const loadTableData = async (queryParam = null) => {
  loading.value = true
  try {
    const data = await getUserList({ ...queryParam, ...query })
    tableData.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  loadTableData()
})

defineExpose({
  loadTableData,
  handleDeleteMultiple,
})
</script>

<style lang="scss" scoped>
.table-contain {
  height: 100%;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .table-main {
    flex: 1;
    min-height: 0;
  }
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
  .pagination {
    margin-left: auto;
    height: 60px;
  }
}
</style>
