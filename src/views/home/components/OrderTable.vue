<template>
  <section class="table-card">
    <h3>近期订单</h3>
    <el-table :data="tableData" class="order-table" border style="width: 100%" height="100%">
      <el-table-column prop="date" label="Date" width="190" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </section>
</template>

<script setup>
const tableData = Array.from({ length: 12 }, (_, i) => ({
  date: `2016-05-${String((i % 31) + 1).padStart(2, '0')}`, // 日期循环 01~31
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}))
</script>

<style lang="scss" scoped>
.table-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 0;
  .ordertable {
    flex: 1;
    min-height: 0;
  }
}
</style>
