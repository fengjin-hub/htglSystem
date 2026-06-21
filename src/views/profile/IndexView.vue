<template>
  <div class="profile-container">
    <div class="contain-left"><SideInfo :user-info="userStore.userInfo" /></div>
    <div class="contain-main">
      <BasicInfo :user-info="userStore.userInfo" />
      <ProfileSave
        :phone_number="userStore.userInfo.phone_number"
        :email="userStore.userInfo.email"
      />
      <RecordTable :table-data="tableData" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SideInfo from './components/SideInfo.vue'
import BasicInfo from './components/BasicInfo.vue'
import ProfileSave from './components/ProfileSave.vue'
import RecordTable from './components/RecordTable.vue'
import { getProfileLoginList } from '@/api/profile.js'
import { useUserStore } from '@/stores/modules/user.js'

const userStore = useUserStore()
const tableData = ref([])

onMounted(async () => {
  const { list } = await getProfileLoginList()
  tableData.value = list
})
</script>

<style lang="scss" scoped>
.profile-container {
  height: 100%;
  display: flex;
  gap: 20px;
  flex-direction: row;
  .contain-left {
    width: 400px;
    height: 100%;
  }
  .contain-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
