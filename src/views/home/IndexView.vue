<template>
  <div class="home-container">
    <div class="top-info">
      <InfoCard :data="topInfo" />
    </div>
    <div class="content-chart">
      <div class="chart-line">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            height: 40px;
          "
        >
          <p style="font-size: 20px; font-weight: bold">销售趋势</p>
          <el-select placeholder="请选择" style="width: 100px">
            <el-option label="近七天" value="week" />
            <el-option label="近一个月" value="month" />
          </el-select>
        </div>
        <div style="flex: 1">
          <EchartTable />
        </div>
      </div>
      <div class="chart-pie">
        <p>访问来源</p>
        <div style="flex: 1">
          <EchartPie />
        </div>
      </div>
    </div>
    <div class="order-table">
      <div class="table-header">
        <p>近期订单</p>
      </div>
      <div class="table-container">
        <OrderTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserFilled, Shop, Histogram, Coin } from '@element-plus/icons-vue'
import EchartTable from './components/EchartLine.vue'
import EchartPie from './components/EchartPie.vue'
import InfoCard from './components/InfoCard.vue'
import OrderTable from './components/OrderTable.vue'

const topInfo = [
  {
    title: '用户总数',
    value: '1,234',
    icon: UserFilled,
    color: 'blue',
    upDown: 'up',
  },
  {
    title: '订单总数',
    value: '567',
    icon: Shop,
    color: 'green',
    upDown: 'down',
  },
  {
    title: '访问量',
    value: '8,901',
    icon: Histogram,
    color: 'orange',
    upDown: 'up',
  },
  {
    title: '收入总额',
    value: '$12,345',
    icon: Coin,
    color: 'purple',
    upDown: 'up',
  },
]
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;
  .top-info {
    display: flex;
    height: 120px;
    gap: 10px;
    margin-bottom: 10px;
  }
  .content-chart {
    height: 350px;
    display: flex;
    justify-content: center;
    gap: 10px;
    .chart-line {
      display: flex;
      flex-direction: column;
      width: 55%;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .chart-pie {
      display: flex;
      flex-direction: column;
      width: 45%;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      p {
        padding: 10px;
        font-size: 20px;
        font-weight: bold;
        height: 40px;
      }
    }
  }
  .order-table {
    flex: 1;
    display: flex;
    min-height: 0;
    flex-direction: column;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    .table-header {
      height: 40px;
      padding: 10px;
      font-size: 20px;
      font-weight: bold;
    }
    .table-container {
      flex: 1;
      min-height: 0;
      box-sizing: border-box;
    }
  }
}
</style>
