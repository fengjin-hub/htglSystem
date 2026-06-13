import router from '@/router/index.js'
// import { getToken } from '@/utils/auth.js'
import { useUserStore } from '@/stores/modules/user'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
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
