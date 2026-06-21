<template>
  <section class="info-card">
    <header class="card-header">
      <h2>基本资料</h2>

      <div class="header-actions">
        <template v-if="isEditing">
          <button class="default-button" type="button" @click="handleCancel">取消</button>

          <button class="primary-button" type="button" @click="handleSave">保存</button>
        </template>

        <button v-else class="primary-button" type="button" @click="handleEdit">编辑资料</button>
      </div>
    </header>

    <div class="info-form">
      <div class="form-item">
        <label for="nickname">用户名称</label>

        <input
          v-if="isEditing"
          id="nickname"
          v-model.trim="formData.nickname"
          type="text"
          maxlength="20"
          placeholder="请输入用户名称"
        />

        <span v-else class="text-value">
          {{ userInfo.nickname || '-' }}
        </span>
      </div>

      <div class="form-item">
        <label>登录账号</label>

        <span class="text-value">
          {{ userInfo.user_name || '-' }}
        </span>
      </div>

      <div class="form-item">
        <label for="phone_number">手机号码</label>

        <input
          v-if="isEditing"
          id="phone_number"
          v-model.trim="formData.phone_number"
          type="text"
          maxlength="20"
          placeholder="请输入手机号码"
        />

        <span v-else class="text-value">
          {{ userInfo.phone_number || '-' }}
        </span>
      </div>

      <div class="form-item">
        <label for="email">邮箱地址</label>

        <input
          v-if="isEditing"
          id="email"
          v-model.trim="formData.email"
          type="email"
          maxlength="50"
          placeholder="请输入邮箱地址"
        />

        <span v-else class="text-value">
          {{ userInfo.email || '-' }}
        </span>
      </div>

      <div class="form-item">
        <label>所属部门</label>

        <span class="text-value">
          {{ userInfo.dept_name || '-' }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  userInfo: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['save'])

const isEditing = ref(false)

const formData = reactive({
  nickname: '',
  phone_number: '',
  email: '',
})

function syncFormData() {
  formData.nickname = props.userInfo.nickname || ''
  formData.phone_number = props.userInfo.phone_number || ''
  formData.email = props.userInfo.email || ''
}

function handleEdit() {
  syncFormData()
  isEditing.value = true
}

function handleCancel() {
  isEditing.value = false
}

function handleSave() {
  if (!formData.nickname) {
    window.alert('请输入用户昵称')
    return
  }

  emit('save', {
    nickname: formData.nickname,
    phone_number: formData.phone_number,
    email: formData.email,
  })

  isEditing.value = false
}
</script>

<style lang="scss" scoped>
.info-card {
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgb(0 0 0 / 4%);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;

  h2 {
    margin: 0;
    color: #1d2a3a;
    font-size: 18px;
  }
}

.header-actions {
  display: flex;
  gap: 10px;
}

button {
  height: 34px;
  padding: 0 14px;
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.primary-button {
  color: #fff;
  background: #2878ff;
  border: 1px solid #2878ff;

  &:hover {
    background: #1668dc;
    border-color: #1668dc;
  }
}

.default-button {
  color: #526078;
  background: #fff;
  border: 1px solid #d8e0ec;

  &:hover {
    color: #2878ff;
    border-color: #2878ff;
  }
}

.info-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 44px;
  row-gap: 22px;
}

.form-item {
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr);
  align-items: center;
  gap: 16px;
  min-width: 0;

  label {
    color: #34445d;
    font-size: 14px;
  }
}

.text-value {
  min-width: 0;
  overflow: hidden;
  color: #26364d;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

input,
select {
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  padding: 0 12px;
  color: #26364d;
  font: inherit;
  font-size: 14px;
  outline: none;
  background: #fff;
  border: 1px solid #d8e0ec;
  border-radius: 4px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #2878ff;
  }
}

@media (max-width: 900px) {
  .info-form {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .info-card {
    padding: 18px;
  }

  .card-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .form-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>
