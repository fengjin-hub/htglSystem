<template>
  <div class="user-contain">
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
        :list-api="getUserList"
        :delete-api="deleteUser"
        row-key="user_id"
        row-name-key="user_name"
        delete-display-label="用户"
        @edit="Open"
      />
    </div>
  </div>

  <FormDialog
    v-model:visible="dialogFormVisible"
    :data="dialogFormData"
    :mode="dialogFormMode"
    :fields="dialogFields"
    :default-value="{ status: 1 }"
    :rules="dialogRules"
    :add-api="addUser"
    :edit-api="editUser"
    :title-map="{ add: '新增用户', edit: '编辑用户' }"
    :success-message="{ add: '用户添加成功', edit: '用户编辑成功' }"
    @success="handleSuccess"
  />
</template>

<script setup>
import { ref } from 'vue'
import SearchForm from '@/components/SearchForm.vue'
import Table from '@/components/TableView.vue'
import FormDialog from '@/components/FormDialog.vue'
import { getUserList, addUser, editUser, deleteUser } from '@/api/user'
import { statusOptions, sexOptions, deptOptions, userRoleOptions } from '@/constants/options'

const searchFields = [
  { prop: 'user_name', label: '用户名', type: 'input' },
  { prop: 'status', label: '状态', type: 'select', width: 140, options: statusOptions },
  { prop: 'dept_name', label: '部门', type: 'select', width: 200, options: deptOptions },
  {
    prop: 'create_time',
    label: '创建时间',
    type: 'datetimerange',
  },
]

const tableColumns = [
  { prop: 'user_id', label: '用户ID', width: 120 },
  { prop: 'user_name', label: '用户名', width: 120 },
  { prop: 'avatar_img', label: '头像', width: 120, type: 'image' },
  { prop: 'sex', label: '性别', width: 80, type: 'options', options: sexOptions },
  { prop: 'dept_name', label: '部门', width: 150 },
  { prop: 'phone_number', label: '手机号', width: 180 },
  { prop: 'status', label: '状态', width: 120, type: 'status', options: statusOptions },
  { prop: 'create_time', label: '创建时间', width: 250 },
]

const dialogFields = [
  { prop: 'user_name', label: '用户名', type: 'input', required: true },
  { prop: 'full_name', label: '用户姓名', type: 'input', required: true },
  {
    prop: 'dept_name',
    label: '所属部门',
    type: 'select',
    required: true,
    placeholder: '请选择部门',
    options: deptOptions,
  },
  {
    prop: 'user_role',
    label: '用户角色',
    type: 'select',
    required: true,
    placeholder: '请选择角色',
    options: userRoleOptions,
  },
  { prop: 'phone_number', label: '手机号码', type: 'input' },
  { prop: 'email', label: '邮箱地址', type: 'input' },
  { prop: 'sex', label: '性别', type: 'select', placeholder: '请选择性别', options: sexOptions },
  { prop: 'status', label: '状态', type: 'switch', required: true, options: statusOptions },
  { prop: 'remark', label: '备注', type: 'textarea' },
]

const dialogRules = {
  user_name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在6-10个字符之间', trigger: 'blur' },
  ],
  full_name: [
    { required: true, message: '请输入用户姓名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在3-10个字符之间', trigger: 'blur' },
  ],
  dept_name: [{ required: true, message: '请选择所属部门', trigger: 'change' }],
  user_role: [{ required: true, message: '请选择角色', trigger: 'change' }],
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
.user-contain {
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
