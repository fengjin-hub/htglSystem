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
    {
      path: '/system',
      component: layout,
      redirect: '/home',
      meta: {
        title: '系统管理',
        clickAble: false,
      },
      children: [
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/system/user/IndexView.vue'),
          meta: {
            title: '用户管理',
            keepAlive: true,
          },
        },
        {
          path: 'role',
          name: 'role',
          component: () => import('../views/system/role/IndexView.vue'),
          meta: {
            title: '角色管理',
            keepAlive: true,
          },
        },
        {
          path: 'menu',
          name: 'menu',
          component: () => import('../views/system/menu/IndexView.vue'),
          meta: {
            title: '菜单管理',
            keepAlive: true,
          },
        },
        {
          path: 'dept',
          name: 'dept',
          component: () => import('../views/system/dept/IndexView.vue'),
          meta: {
            title: '部门管理',
            keepAlive: true,
          },
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
          meta: {
            title: '日志管理',
            keepAlive: true,
          },
        },
      ],
    },
    {
      path: '/',
      component: layout,
      children: [
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/log/IndexView.vue'),
          meta: {
            title: '个人中心',
            keepAlive: true,
          },
        },
      ],
    },
  ],
})
export default router
