import router from '@/router/index.js'
import { getToken } from '@/utils/auth.js'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const token = getToken()

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
