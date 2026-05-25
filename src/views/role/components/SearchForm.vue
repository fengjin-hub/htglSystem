<template>
  <div class="search-contain">
    <el-form
      :model="searchForm"
      inline
      label-position="left"
      label-width="70px"
      class="search-form"
    >
      <el-form-item label="用户名">
        <el-input v-model="searchForm.user_name" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="状态">
        <el-select
          v-model="searchForm.status"
          clearable
          placeholder="请选择状态"
          style="width: 140px"
        >
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="部门">
        <el-select
          v-model="searchForm.dept_name"
          clearable
          placeholder="请选择部门"
          style="width: 200px"
        >
          <el-option
            v-for="item in ['研发部', '销售部', '财务部', '运维部', '人事部', '后勤部']"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="创建时间">
        <el-date-picker
          v-model="searchForm.create_time"
          type="datetimerange"
          value-format="YYYY-MM-DD HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          popper-class="my-date-popper"
          :teleported="true"
        />
      </el-form-item>
    </el-form>

    <div class="form-btns">
      <div class="tools=btns">
        <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button type="danger" plain :icon="Delete" @click="handleDelete">删除</el-button>
        <el-button type="info" plain :icon="Download">导出</el-button>
      </div>
      <div class="search-btns">
        <el-button type="primary" :icon="Search" @click="handleSearch"> 查询 </el-button>
        <el-button :icon="Refresh" @click="handleReset"> 重置 </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Plus, Search, Delete, Download, Refresh } from '@element-plus/icons-vue'

const emit = defineEmits(['add', 'deleteMultiple', 'search'])

const searchForm = reactive({
  user_name: '',
  status: '',
  dept_name: '',
  create_time: '',
})

const handleAdd = () => {
  emit('add', { mode: 'add', data: null })
}

const handleDelete = () => {
  emit('deleteMultiple')
}

const cleanObject = (obj) => {
  const newObj = {}

  Object.keys(obj).forEach((key) => {
    const value = obj[key]

    if (value !== '' && value !== null && value !== undefined) {
      newObj[key] = value
    }
  })

  return newObj
}

const handleSearch = () => {
  const { create_time, ...rest } = searchForm
  const [start_time, end_time] = create_time ?? []
  emit(
    'search',
    cleanObject({
      ...rest,
      start_time,
      end_time,
    }),
  )
}

const handleReset = () => {
  searchForm.user_name = ''
  searchForm.status = ''
  searchForm.dept_name = ''
  searchForm.create_time = ''
}
</script>

<style lang="scss" scoped>
.search-contain {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .search-form {
    display: flex;
    justify-content: space-between;
  }
  .form-btns {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}
</style>

<style lang="scss">
.el-time-panel {
  margin-left: -40px !important;
}
</style>
