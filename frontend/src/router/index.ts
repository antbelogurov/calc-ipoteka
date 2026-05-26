import { createRouter, createWebHistory } from 'vue-router'
import LoansView from '@/views/LoansView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'loans',
      component: LoansView,
    },
    {
      path: '/overview',
      name: 'overview',
      component: () => import('@/views/HomeView.vue'),
    },
  ],
})

export default router
