<template>
  <div class="form-contain">
    <div class="top">
      <img :src="imga" alt="Login Image" />
      <h2>后台管理系统</h2>
    </div>
    <div class="discribe">
      <h1>高效管理</h1>
      <h1>从这里开始</h1>
      <h3>专业的后台管理系统</h3>
      <h3>让管理更简单，工作更高效</h3>
    </div>
  </div>
</template>

<script setup>
import imga from '@/assets/icons/logo.png'
</script>

<style scoped lang="scss">
.form-contain {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: #fff;
  // padding: 20px;
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    height: 50px;
    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
  }
  .discribe {
    margin-left: 40px;
    margin-top: 60px;
    h1 {
      font-size: 36px;
      white-space: nowrap;
    }
    h3 {
      font-weight: lighter;
      white-space: nowrap;
    }
  }
}
</style>
