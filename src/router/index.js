import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home',
      component: () => import('@/layout/default.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/pages/Index.vue')
        },
      ]
    },
  ]
})

export default router

