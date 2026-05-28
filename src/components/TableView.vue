<template>
  <div class="table-contain">
    <div class="table-main">
      <el-table
        v-loading="loading"
        :data="tableData"
        highlight-current-row
        border
        :row-key="rowKey"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        default-expand-all
        style="width: 100%"
        height="100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="selectable" type="selection" width="55" />
        <el-table-column
          v-for="column in columns"
          :key="column.prop || column.label"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :fixed="column.fixed"
          :show-overflow-tooltip="column.showOverflowTooltip"
        >
          <template v-if="column.type" #default="scope">
            <img v-if="column.type === 'image'" :src="loginBg" alt="" class="table-image" />
            <div v-else-if="column.type === 'status'" class="status-wrap">
              <span class="status-dot" :class="getStatusClass(column, scope.row)" />
              <span>{{ getOptionLabel(column, scope.row) }}</span>
            </div>
            <span v-else-if="column.type === 'options'">
              {{ getOptionLabel(column, scope.row) }}
            </span>
            <slot
              v-else-if="column.type === 'slot'"
              :name="column.prop"
              :row="scope.row"
              :column="column"
              :index="scope.$index"
            />
          </template>
        </el-table-column>
        <el-table-column v-if="showActions" label="操作" min-width="180" fixed="right">
          <template #default="scope">
            <el-button text type="primary" @click="handleEdit(scope.row)"> 编辑 </el-button>
            <el-button text type="danger" @click="handleDeleteOne(scope.row)"> 删除 </el-button>
            <slot name="actions" :row="scope.row" :index="scope.$index" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      v-if="showPagination"
      v-model:current-page="query.page"
      v-model:page-size="query.pageSize"
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
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import loginBg from '@/assets/images/login_bg.png'

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  listApi: {
    type: Function,
    required: true,
  },
  deleteApi: {
    type: Function,
    default: null,
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  deleteDisplayColumn: {
    type: String,
    default: 'id',
  },
  selectable: {
    type: Boolean,
    default: true,
  },
  showActions: {
    type: Boolean,
    default: true,
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['edit', 'deleteSuccess', 'loadSuccess'])

const tableData = ref([])
const loading = ref(false)
const total = ref(0)
const query = reactive({
  page: 1,
  pageSize: 10,
})
const selectedRows = ref([])

const getDeleteDisplayLable = () => {
  const label = props.columns.find((column) => column.prop === props.deleteDisplayColumn)?.label
  return label
}

const getOptionLabel = (column, row) => {
  const option = column.options?.find((item) => item.value === row?.[column.prop])
  return option?.label ?? row?.[column.prop]
}

const getStatusClass = (column, row) => {
  const option = column.options?.find((item) => item.value === row?.[column.prop])
  return option?.className || (row?.[column.prop] ? 'enabled' : 'disabled')
}

const handleEdit = (rowData) => {
  emit('edit', { mode: 'edit', data: rowData })
}

const handleSelectionChange = (rows) => {
  selectedRows.value = rows
}

const deleteRows = async (rows) => {
  if (!props.deleteApi) return
  await props.deleteApi(rows.map((row) => row[props.rowKey]))
  await loadTableData()
  emit('deleteSuccess', rows)
}

const confirmDelete = async (message) => {
  try {
    await ElMessageBox.confirm(message, '删除确认', {
      type: 'warning',
    })

    return true
  } catch {
    return false
  }
}

const handleDeleteOne = async (row) => {
  const ok = await confirmDelete(
    `确认删除${getDeleteDisplayLable()}为【${row[props.deleteDisplayColumn]}】的数据吗？`,
  )
  if (!ok) return
  await deleteRows([row])
  ElMessage.success(`${getDeleteDisplayLable()}【${row[props.deleteDisplayColumn]}】删除成功`)
}

const handleDeleteMultiple = async () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning(`请至少选择一个${getDeleteDisplayLable()}进行删除`)
    return
  }
  const ok = await confirmDelete(`确认删除${selectedRows.value.length}条数据吗？`)
  if (!ok) return
  const rows = selectedRows.value
  const names = rows.map((row) => row[props.deleteDisplayColumn]).join('、')
  await deleteRows(rows)
  ElMessage.success(`${getDeleteDisplayLable()}【${names}】等删除成功`)
}

const loadTableData = async (queryParam = {}) => {
  loading.value = true
  try {
    const data = await props.listApi({ ...queryParam, ...query })
    tableData.value = data?.list ?? []
    total.value = data?.total ?? tableData.value.length
    emit('loadSuccess', data)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
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
  .table-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
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
