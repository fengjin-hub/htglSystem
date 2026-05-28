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
    },
    {
      path: '/',
      component: layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/home/IndexView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: layout,
      children: [
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/user/IndexView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: layout,
      children: [
        {
          path: '/role',
          name: 'role',
          component: () => import('../views/role/IndexView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: layout,
      children: [
        {
          path: '/menu',
          name: 'menu',
          component: () => import('../views/menu/IndexView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: layout,
      children: [
        {
          path: '/dept',
          name: 'dept',
          component: () => import('../views/dept/IndexView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: layout,
      children: [
        {
          path: '/log',
          name: 'log',
          component: () => import('../views/log/IndexView.vue'),
        },
      ],
    },
    // {
    //   path: '/',
    //   component: layout,
    //   children: [
    //     {
    //       path: '/profile',
    //       name: 'profile',
    //       component: () => import('../views/profile/IndexView.vue'),
    //     },
    //   ],
    // },
  ],
})
export default router
