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
        delete-display-label="菜单"
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

  <FormDialog
    v-model:visible="dialogFormVisible"
    :data="dialogFormData"
    :mode="dialogFormMode"
    :fields="dialogFields"
    :default-value="{ user_number: 0, sort: 1, status: 1 }"
    :rules="dialogRules"
    :add-api="addMenu"
    :edit-api="editMenu"
    :title-map="{ add: '新增菜单', edit: '编辑菜单' }"
    :success-message="{ add: '菜单添加成功', edit: '菜单编辑成功' }"
    @success="handleSuccess"
  />
</template>

<script setup>
import { ref } from 'vue'
import SearchForm from '@/components/SearchForm.vue'
import Table from '@/components/TableView.vue'
import FormDialog from '@/components/FormDialog.vue'
import { getMenuList, addMenu, editMenu, deleteMenu } from '@/api/menu'
import { statusOptions, deptOptions, menuTypeOptions } from '@/constants/options'

const searchFields = [
  { prop: 'menu_name', label: '菜单名称', type: 'input' },
  { prop: 'menu_type', label: '菜单编码', type: 'input' },
  { prop: 'status', label: '状态', type: 'select', width: 140, options: statusOptions },
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

const dialogFields = [
  { prop: 'menu_name', label: '菜单名称', type: 'input', required: true },
  { prop: 'menu_type', label: '菜单编码', type: 'input', required: true },
  { prop: 'data_permission', label: '数据权限', type: 'input', required: true },
  { prop: 'sort', label: '显示排序', type: 'number' },
  { prop: 'menu_permission', label: '菜单权限', type: 'select', options: deptOptions },
  { prop: 'status', label: '状态', type: 'switch', required: true, options: statusOptions },
  { prop: 'remark', label: '备注', type: 'textarea' },
]

const dialogRules = {
  menu_name: [
    { required: true, message: '请输入菜单名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在3-10个字符之间', trigger: 'blur' },
  ],
  menu_type: [
    { required: true, message: '请输入菜单编码', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在3-20个字符之间', trigger: 'blur' },
  ],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
}

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
