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
        entity-name="用户"
        @edit="Open"
      />
    </div>
  </div>

  <UserDialog
    v-model:visible="dialogFormVisible"
    :data="dialogFormData"
    :mode="dialogFormMode"
    :fields="dialogFields"
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
import SearchForm from './PublicComponent/SearchForm.vue'
import Table from './PublicComponent/TableView.vue'
import UserDialog from './PublicComponent/UserDialog.vue'
import { getUserList, addUser, editUser, deleteUser } from '@/api/user'
import loginBg from '@/assets/images/login_bg.png'

const deptOptions = [
  { label: '研发部', value: '研发部' },
  { label: '销售部', value: '销售部' },
  { label: '财务部', value: '财务部' },
  { label: '运维部', value: '运维部' },
  { label: '人事部', value: '人事部' },
  { label: '后勤部', value: '后勤部' },
]

const statusOptions = [
  { label: '启用', value: 1, className: 'enabled' },
  { label: '禁用', value: 0, className: 'disabled' },
]

const sexOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 0 },
]

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
  { prop: 'avatar_img', label: '头像', width: 150, type: 'image', imageSrc: loginBg },
  { prop: 'sex', label: '性别', width: 80, type: 'options', options: sexOptions },
  { prop: 'dept_name', label: '部门', width: 150 },
  { prop: 'phone_number', label: '手机号', width: 180 },
  { prop: 'status', label: '状态', width: 120, type: 'status', options: statusOptions },
  { prop: 'create_time', label: '创建时间', width: 250 },
]

const dialogFields = [
  { prop: 'user_name', label: '用户名', type: 'input', required: true },
  { prop: 'sex', label: '性别', type: 'select', placeholder: '请选择性别', options: sexOptions },
  {
    prop: 'dept_name',
    label: '所属部门',
    type: 'select',
    required: true,
    placeholder: '请选择部门',
    options: deptOptions,
  },
  { prop: 'phone_number', label: '手机号', type: 'input' },
  { prop: 'status', label: '状态', type: 'radio', required: true, options: statusOptions },
]

const dialogRules = {
  user_name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在6-10个字符之间', trigger: 'blur' },
  ],
  dept_name: [
    {
      required: true,
      message: '请选择所属部门',
      trigger: 'change',
    },
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
