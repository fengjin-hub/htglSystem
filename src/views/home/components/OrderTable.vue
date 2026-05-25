<template>
  <el-table :data="tableData" border style="width: 100%" height="100%">
    <el-table-column prop="date" label="Date" width="190" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script setup>
const tableData = Array.from({ length: 12 }, (_, i) => ({
  date: `2016-05-${String((i % 31) + 1).padStart(2, '0')}`, // 日期循环 01~31
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}))
</script>

<style lang="scss" scoped></style>
