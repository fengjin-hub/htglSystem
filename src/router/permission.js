import router from '@/router/index.js'
import { useUserStore } from '@/stores/modules/user'
import { useTagsStore } from '@/stores/modules/tags'

const whiteList = ['/login']

router.beforeEach((to, from) => {
  const userStore = useUserStore()
  const token = userStore.token

  document.title = to.meta.title

  if (token) {
    if (to.path === '/login') {
      return '/home'
    } else {
      return
    }
  } else {
    if (whiteList.includes(to.path)) {
      return
    } else {
      return '/login'
    }
  }
})

router.afterEach((to, from, failure) => {
  const tagsStore = useTagsStore()
  if (to.path === '/login') {
    tagsStore.logout()
    return
  }
  if (tagsStore.tags.some((item) => item.path === to.path)) return
  if (to.path === '/home') return

  tagsStore.addTags({
    title: to.meta.title,
    path: to.path,
    name: to.name,
  })
})
