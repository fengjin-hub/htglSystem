import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: {},
    menus: [],
    permissions: [],
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    setMenus(menus) {
      this.menus = menus
    },
    setPermissions(permissions) {
      this.permissions = permissions
    },
    logout() {
      this.$reset()
    },
  },
  persist: true,
})
