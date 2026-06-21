<template>
  <section class="save-card">
    <h2>账号安全</h2>
    <div class="info-list">
      <div class="info-item">
        <el-icon size="30" color="blue"><Lock /></el-icon>
        <div class="item-content">
          <p class="item-title">登录密码</p>
          <p class="item-content">建议定期更换密码</p>
        </div>
      </div>
      <div class="info-item">
        <el-icon size="30" color="blue"><Iphone /></el-icon>
        <div class="item-content">
          <p class="item-title">绑定手机</p>
          <!-- <p class="item-content">已绑定138****1234</p> -->
          <p class="item-content">{{ getPhoneNumber() }}</p>
        </div>
      </div>

      <div class="info-item">
        <el-icon size="30" color="blue"><Message /></el-icon>
        <div class="item-content">
          <p class="item-title">绑定邮箱</p>
          <p class="item-content">{{ email?.length ? '已绑定' + email : '未绑定' }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Lock, Iphone, Message } from '@element-plus/icons-vue'

const props = defineProps({
  phone_number: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
})

const getPhoneNumber = () => {
  if (props.phone_number?.length) {
    return props.phone_number.slice(0, 3) + '****' + props.phone_number.slice(7)
  } else return '未绑定'
}
</script>

<style lang="scss" scoped>
.save-card {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

  h2 {
    margin: 0;
    color: #1d2a3a;
    font-size: 18px;
  }
  .info-list {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    justify-content: space-around;
    .info-item {
      width: 33%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px 0;
      border-radius: 4px;
      border: 1px solid #edf0f5;

      .item-content {
        margin-left: 10px;
        p {
          margin: 0;
          color: #8b99b0;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
