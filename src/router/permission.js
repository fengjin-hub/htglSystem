import router from '@/router/index.js'
import pinia from '@/stores'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore(pinia)
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const token = userStore.token

  document.title = to.meta.title

  if (token) {
    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
