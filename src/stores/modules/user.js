import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: {},
    menus: [],
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
    logout() {
      this.$reset()
    },
  },
  persist: true,
})
