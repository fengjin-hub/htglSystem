<template>
  <div class="log-contain">
    <div class="search">
      <SearchForm
        :fields="searchFields"
        :show-add="false"
        @deleteMultiple="handleDeleteMultiple"
        @search="handleSearch"
        @reset="handleSearch"
      />
    </div>
    <div class="table">
      <Table
        ref="tableRef"
        :columns="tableColumns"
        :list-api="getLogList"
        :delete-api="deleteLog"
        :show-actions="false"
        row-key="log_id"
        delete-display-column="log_code"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SearchForm from '@/components/SearchForm.vue'
import Table from '@/components/TableView.vue'
import { getLogList, deleteLog } from '@/api/log'
import { operateStatusOptions, logTypeOptions } from '@/constants/options'

const searchFields = [
  { prop: 'operator', label: '操作人', type: 'input', width: 100 },
  { prop: 'log_type', label: '日志类型', type: 'select', width: 160, options: logTypeOptions },
  { prop: 'status', label: '状态', type: 'select', width: 140, options: operateStatusOptions },
  {
    prop: 'create_time',
    label: '操作时间',
    type: 'datetimerange',
  },
]

const tableColumns = [
  { prop: 'log_code', label: '日志编号', width: 120 },
  { prop: 'operator', label: '操作人', width: 120 },
  { prop: 'operate_module', label: '操作模块', width: 120 },
  { prop: 'log_type', label: '日志类型', width: 160, type: 'options', options: logTypeOptions },
  { prop: 'request_method', label: '请求方式', width: 120 },
  { prop: 'ip', label: 'IP地址', width: 120 },
  { prop: 'cost', label: '耗时', width: 120 },
  { prop: 'status', label: '状态', width: 120, type: 'status', options: operateStatusOptions },
  { prop: 'create_time', label: '操作时间' },
]

const tableRef = ref(null)

const handleDeleteMultiple = () => {
  tableRef.value.handleDeleteMultiple()
}

const handleSearch = (searchForm) => {
  tableRef.value.loadTableData(searchForm)
}
</script>

<style lang="scss" scoped>
.log-contain {
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
