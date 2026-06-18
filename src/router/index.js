import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/login/IndexView.vue'
import layout from '../layout/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: '登录',
      },
    },
    {
      path: '/',
      component: layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/home/IndexView.vue'),
          meta: {
            title: '首页',
            keepAlive: true,
          },
        },
      ],
    },
  ],
})
export default router
