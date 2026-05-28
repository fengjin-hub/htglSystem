<template>
  <div class="menu-contain">
    <div class="search">
      <SearchForm
        :fields="searchFields"
        @add="Open"
        @deleteMultiple="handleDeleteMultiple"
        @search="handleSearch"
        @reset="handleSearch"
      />
    </div>
    <div class="table">
      <Table
        ref="tableRef"
        :columns="tableColumns"
        :list-api="getMenuList"
        :delete-api="deleteMenu"
        row-key="menu_id"
        row-name-key="menu_name"
        delete-display-column="menu_name"
        :showPagination="false"
        @edit="Open"
      >
        <template #menu_type="{ row }">
          <el-tag :type="menuTypeOptions.find((item) => item.value === row.menu_type)?.type">
            {{ menuTypeOptions.find((item) => item.value === row.menu_type)?.label }}
          </el-tag>
        </template>
      </Table>
    </div>
  </div>

  <MenuDialog
    v-model:visible="dialogFormVisible"
    :data="dialogFormData"
    :mode="dialogFormMode"
    @success="handleSuccess"
  />
</template>

<script setup>
import { ref } from 'vue'
import SearchForm from '@/components/SearchForm.vue'
import Table from '@/components/TableView.vue'
import MenuDialog from './components/MenuDialog.vue'
import { getMenuList, deleteMenu } from '@/api/menu'
import { statusOptions, menuTypeOptions } from '@/constants/options'

const searchFields = [
  { prop: 'menu_name', label: '菜单名称', type: 'input' },
  { prop: 'menu_type', label: '菜单类型', type: 'select', width: 160, options: menuTypeOptions },
  { prop: 'status', label: '状态', type: 'select', width: 130, options: statusOptions },
  {
    prop: 'create_time',
    label: '创建时间',
    type: 'datetimerange',
  },
]

const tableColumns = [
  { prop: 'menu_name', label: '菜单名称', width: 220 },
  { prop: 'menu_type', label: '菜单类型', width: 120, type: 'slot', options: menuTypeOptions },
  { prop: 'icon', label: '图标', width: 120 },
  { prop: 'path', label: '路由地址', width: 120 },
  { prop: 'component', label: '组件路径', width: 120 },
  { prop: 'permission', label: '权限标识', width: 120 },
  { prop: 'sort', label: '排序', width: 120 },
  { prop: 'status', label: '状态', width: 120, type: 'status', options: statusOptions },
  { prop: 'create_time', label: '创建时间', width: 250 },
]

const tableRef = ref(null)

const dialogFormVisible = ref(false)
const dialogFormData = ref(null)
const dialogFormMode = ref(null)

const Open = ({ mode, data }) => {
  dialogFormMode.value = mode
  dialogFormData.value = data
  dialogFormVisible.value = true
}

const handleSuccess = () => {
  tableRef.value.loadTableData()
}

const handleDeleteMultiple = () => {
  tableRef.value.handleDeleteMultiple()
}

const handleSearch = (searchForm) => {
  tableRef.value.loadTableData(searchForm)
}
</script>

<style lang="scss" scoped>
.menu-contain {
  display: flex;
  height: 100%;
  flex-direction: column;
  .search {
    height: 130px;
  }
  .table {
    flex: 1;
    background-color: #fff;
    min-height: 0;
  }
}
</style>
