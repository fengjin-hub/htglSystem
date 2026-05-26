<template>
  <div class="role-contain">
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
        :list-api="getRoleList"
        :delete-api="deleteRole"
        row-key="role_id"
        row-name-key="role_name"
        delete-display-label="角色"
        @edit="Open"
      />
    </div>
  </div>

  <FormDialog
    v-model:visible="dialogFormVisible"
    :data="dialogFormData"
    :mode="dialogFormMode"
    :fields="dialogFields"
    :default-value="{ user_number: 0, sort: 1, status: 1 }"
    :rules="dialogRules"
    :add-api="addRole"
    :edit-api="editRole"
    :title-map="{ add: '新增角色', edit: '编辑角色' }"
    :success-message="{ add: '角色添加成功', edit: '角色编辑成功' }"
    @success="handleSuccess"
  />
</template>

<script setup>
import { ref } from 'vue'
import SearchForm from '@/components/SearchForm.vue'
import Table from '@/components/TableView.vue'
import FormDialog from '@/components/FormDialog.vue'
import { getRoleList, addRole, editRole, deleteRole } from '@/api/role'
import { statusOptions, deptOptions } from '@/constants/options'

const searchFields = [
  { prop: 'role_name', label: '角色名称', type: 'input' },
  { prop: 'role_code', label: '角色编码', type: 'input' },
  { prop: 'status', label: '状态', type: 'select', width: 140, options: statusOptions },
  {
    prop: 'create_time',
    label: '创建时间',
    type: 'datetimerange',
  },
]

const tableColumns = [
  { prop: 'role_id', label: '角色ID', width: 120 },
  { prop: 'role_name', label: '角色名', width: 120 },
  { prop: 'role_code', label: '角色编码', width: 120 },
  { prop: 'data_permission', label: '数据权限', width: 220 },
  { prop: 'user_number', label: '用户数量', width: 120 },
  { prop: 'sort', label: '排序', width: 120 },
  { prop: 'status', label: '状态', width: 120, type: 'status', options: statusOptions },
  { prop: 'create_time', label: '创建时间', width: 250 },
]

const dialogFields = [
  { prop: 'role_name', label: '角色名称', type: 'input', required: true },
  { prop: 'role_code', label: '角色编码', type: 'input', required: true },
  { prop: 'data_permission', label: '数据权限', type: 'input', required: true },
  { prop: 'sort', label: '显示排序', type: 'number' },
  { prop: 'menu_permission', label: '菜单权限', type: 'select', options: deptOptions },
  { prop: 'status', label: '状态', type: 'switch', required: true, options: statusOptions },
  { prop: 'remark', label: '备注', type: 'textarea' },
]

const dialogRules = {
  role_name: [
    { required: true, message: '请输入角色名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在3-10个字符之间', trigger: 'blur' },
  ],
  role_code: [
    { required: true, message: '请输入角色编码', trigger: 'blur' },
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
.role-contain {
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
