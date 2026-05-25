<template>
  <div class="contain">
    <div class="login-left">
      <LoginLeft />
    </div>
    <div class="login-form">
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
import LoginForm from './components/LoginForm.vue'
import LoginLeft from './components/LoginLeft.vue'
</script>

<style scoped lang="scss">
.contain {
  background-image: url('@/assets/images/login_bg.png');
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 25% 86%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-left,
  .login-form {
    width: 50%;
    height: 100%;
  }
  .login-form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
