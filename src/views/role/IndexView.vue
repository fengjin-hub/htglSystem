<template>
  <div class="user-contain">
    <div class="search">
      <SearchForm @add="Open" @deleteMultiple="handleDeleteMultiple" @search="handleSearch" />
    </div>
    <div class="table">
      <Table ref="tableRef" @edit="Open" />
    </div>
  </div>

  <UserDialog
    v-model:visible="dialogFormVisible"
    :data="dialogFormData"
    :mode="dialogFormMode"
    @success="handleSuccess"
  />
</template>

<script setup>
import SearchForm from './components/SearchForm.vue'
import Table from './components/TableView.vue'
import UserDialog from './components/UserDialog.vue'
import { ref } from 'vue'

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
