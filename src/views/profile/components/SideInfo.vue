<template>
  <aside class="profile-sidebar">
    <section class="user-summary">
      <div class="avatar">
        <img :src="userInfo.avatar" :alt="用户头像" />
      </div>
      <h2 class="nickname">
        {{ userInfo.nickname || '-' }}
      </h2>
      <p class="user-role">{{ userInfo.role_name }} / {{ userInfo.dept_name || '-' }}</p>
      <div class="action-list">
        <button class="primary-button" type="button">上传头像</button>
        <button class="default-button" type="button">修改密码</button>
      </div>
    </section>

    <section class="account-info">
      <div class="info-item">
        <span class="label">用户账号</span>
        <span class="value">{{ userInfo.user_name || '-' }}</span>
      </div>

      <div class="info-item">
        <span class="label">手机号码</span>
        <span class="value">{{ userInfo.phone_number || '-' }}</span>
      </div>

      <div class="info-item">
        <span class="label">邮箱地址</span>
        <span class="value">{{ userInfo.email || '-' }}</span>
      </div>

      <div class="info-item">
        <span class="label">所属部门</span>
        <span class="value">{{ userInfo.dept_name || '-' }}</span>
      </div>

      <div class="info-item">
        <span class="label">创建时间</span>
        <span class="value">{{ userInfo.create_time || '-' }}</span>
      </div>
    </section>
  </aside>
</template>

<script setup>
defineProps({
  userInfo: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<style lang="scss" scoped>
.profile-sidebar {
  min-width: 0;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgb(0 0 0 / 4%);
}

.user-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 28px 26px;
  border-bottom: 1px solid #edf0f5;
}

.avatar {
  width: 104px;
  height: 104px;
  overflow: hidden;
  color: #fff;
  font-size: 36px;
  font-weight: 600;
  background: #dbe5f3;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.nickname {
  margin: 18px 0 8px;
  color: #1d2a3a;
  font-size: 22px;
  line-height: 1.4;
}

.user-role {
  margin: 0;
  color: #8290a8;
  font-size: 14px;
}

.action-list {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

button {
  height: 36px;
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

.account-info {
  padding: 0 28px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  min-height: 56px;
  padding: 18px 0;
  line-height: 20px;
  border-bottom: 1px solid #edf0f5;

  &:last-child {
    border-bottom: 0;
  }
}

.label {
  flex-shrink: 0;
  color: #8b99b0;
  font-size: 14px;
}

.value {
  min-width: 0;
  overflow: hidden;
  color: #26364d;
  font-size: 14px;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
