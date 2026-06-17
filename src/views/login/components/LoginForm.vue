<template>
  <div class="login-container">
    <h2>欢迎登录</h2>
    <h4>请输入您的账号密码</h4>
    <el-form ref="formRef" :model="form" status-icon :rules="rules" size="large">
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          style="width: 240px"
          placeholder="请输入用户名"
          :prefix-icon="User"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          style="width: 240px"
          type="password"
          placeholder="请输入密码"
          show-password
          :prefix-icon="Lock"
        />
      </el-form-item>
      <div class="forget-password">
        <el-checkbox v-model="rememberChecked" label="记住我" size="large" />
        <a>忘记密码?</a>
      </div>
      <el-form-item>
        <el-button type="primary" style="width: 240px" @click="submitForm(formRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <el-divider>其他登录方式</el-divider>
    <div class="other-login">
      <el-button type="primary" circle size="large" :icon="ChatRound" />
      <el-button type="primary" circle size="large" :icon="Message" />
      <el-button type="primary" circle size="large" :icon="ChromeFilled" />
    </div>
  </div>
</template>

<script setup>
import { ElFormItem } from 'element-plus'
import { reactive, ref, onMounted } from 'vue'
import { User, Lock, Message, ChatRound, ChromeFilled } from '@element-plus/icons-vue'
import router from '@/router'
import { useUserStore } from '@/stores/modules/user'
import { login, getUserInfo } from '@/api/login'

const userStore = useUserStore()

const formRef = ref()
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在2到10个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在6到12个字符之间', trigger: 'blur' },
  ],
})
const form = reactive({
  username: '',
  password: '',
})
const rememberChecked = ref(false)

const handleLogin = async () => {
  const { token } = await login(form)
  userStore.setToken(token)

  const { menus, userInfo } = await getUserInfo()
  userStore.setMenus(menus)
  userStore.setUserInfo(userInfo)

  router.push('/home')
}

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (rememberChecked.value) {
        localStorage.setItem('rememberedUsername', form.username)
        localStorage.setItem('rememberedPassword', form.password)
      } else {
        localStorage.removeItem('rememberedUsername')
        localStorage.removeItem('rememberedPassword')
      }
      handleLogin()
    } else {
      console.log('登录失败')
      return false
    }
  })
}

onMounted(() => {
  const rememberedUsername = localStorage.getItem('rememberedUsername')
  const rememberedPassword = localStorage.getItem('rememberedPassword')
  if (rememberedUsername && rememberedPassword) {
    form.username = rememberedUsername
    form.password = rememberedPassword
    rememberChecked.value = true
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 520px;
  padding: 20px;
  h4 {
    color: rgb(68, 80, 111);
    margin: 10px 0 25px 0;
    font-weight: normal;
  }
  .other-login {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .forget-password {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    a {
      color: rgb(74, 111, 251);
      font-size: 14px;
    }
  }
}
</style>
