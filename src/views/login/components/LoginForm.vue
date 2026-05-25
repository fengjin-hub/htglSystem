<template>
  <div class="login-container">
    <h2>欢迎登录</h2>
    <h4>请输入您的账号密码</h4>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      size="large"
    >
      <el-form-item prop="username">
        <el-input
          v-model="ruleForm.username"
          style="width: 240px"
          placeholder="请输入用户名"
          :prefix-icon="User"
        />
      </el-form-item>
      <el-form-item prop="pass">
        <el-input
          v-model="ruleForm.pass"
          style="width: 240px"
          type="password"
          placeholder="请输入密码"
          show-password
          :prefix-icon="Lock"
        />
      </el-form-item>
      <el-form-item prop="remember">
        <div class="forget-password">
          <el-checkbox v-model="ruleForm.remember" label="记住我" size="large" />
          <a href="#">忘记密码?</a>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 240px" @click="submitForm(ruleFormRef)">
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
import { reactive, ref } from 'vue'
import { User, Lock, Message, ChatRound, ChromeFilled } from '@element-plus/icons-vue'
import router from '@/router'

const ruleFormRef = ref()
const rules = reactive({
  // username: [
  //   { required: true, message: '请输入用户名', trigger: 'blur' },
  //   { min: 3, max: 6, message: '长度在3到6个字符之间', trigger: 'blur' },
  // ],
  // pass: [
  //   { required: true, message: '请输入密码', trigger: 'blur' },
  //   { min: 6, max: 12, message: '长度在6到12个字符之间', trigger: 'blur' },
  // ],
})
const ruleForm = reactive({
  username: '',
  pass: '',
  remember: '',
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(ruleForm)
      router.push('/home')
    } else {
      console.log('登录失败')
      return false
    }
  })
}
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
    display: flex;
    justify-content: space-between;
    a {
      color: rgb(74, 111, 251);
    }
  }
}
</style>
