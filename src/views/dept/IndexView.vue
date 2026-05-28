<template>
  <div class="dept-contain">
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
        :list-api="getDeptList"
        :delete-api="deleteDept"
        row-key="dept_id"
        delete-display-column="dept_name"
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
    :add-api="addDept"
    :edit-api="editDept"
    :title-map="{ add: '新增部门', edit: '编辑部门' }"
    :success-message="{ add: '部门添加成功', edit: '部门编辑成功' }"
    @success="handleSuccess"
  />
</template>

<script setup>
import { ref } from 'vue'
import SearchForm from '@/components/SearchForm.vue'
import Table from '@/components/TableView.vue'
import FormDialog from '@/components/FormDialog.vue'
import { getDeptList, addDept, editDept, deleteDept } from '@/api/dept'
import { statusOptions } from '@/constants/options'

const searchFields = [
  { prop: 'dept_name', label: '部门名称', type: 'input' },
  { prop: 'director', label: '负责人', type: 'input' },
  { prop: 'status', label: '状态', type: 'select', width: 140, options: statusOptions },
  {
    prop: 'create_time',
    label: '创建时间',
    type: 'datetimerange',
  },
]

const tableColumns = [
  { prop: 'dept_name', label: '部门名称', width: 200 },
  { prop: 'director', label: '负责人', width: 150 },
  { prop: 'phone_number', label: '联系电话', width: 180 },
  { prop: 'email', label: '邮箱', width: 180 },
  { prop: 'member_sum', label: '成员数', width: 120 },
  { prop: 'sort', label: '排序', width: 120 },
  { prop: 'status', label: '状态', width: 120, type: 'status', options: statusOptions },
  { prop: 'create_time', label: '创建时间', width: 250 },
]

const dialogFields = [
  { prop: 'parent_id', label: '上级部门', type: 'input' },
  { prop: 'dept_name', label: '部门名称', type: 'input', required: true },
  { prop: 'director', label: '负责人', type: 'input', required: true },
  { prop: 'phone_number', label: '联系电话', type: 'input' },
  { prop: 'email', label: '邮箱', type: 'input' },
  { prop: 'sort', label: '显示排序', type: 'number' },
  { prop: 'member_sum', label: '部门人数', type: 'number' },
  { prop: 'status', label: '状态', type: 'switch', required: true, options: statusOptions },
]

const dialogRules = {
  dept_name: [
    { required: true, message: '请输入部门名称', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在3-10个字符之间', trigger: 'blur' },
  ],
  director: [
    { required: true, message: '请输入负责人', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在3-10个字符之间', trigger: 'blur' },
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
.dept-contain {
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
