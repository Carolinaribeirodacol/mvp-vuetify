import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/LoginLayout.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/pages/LoginPage.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/pages/RegisterPage.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/pages/HomePage.vue'),
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('@/pages/CategoryPage.vue'),
        },
        {
          path: 'form-category/:id?',
          name: 'form-category',
          component: () => import('@/pages/CategoryFormPage.vue'),
        },
        {
          path: 'product',
          name: 'product',
          component: () => import('@/pages/ProductPage.vue'),
        },
        {
          path: 'form-product/:id?',
          name: 'form-product',
          component: () => import('@/pages/ProductFormPage.vue'),
        },
      ],
    },
  ],
})

const auth = useAuth()

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && auth.isTokenExpired()) {
    next({ name: 'login' })
  } else if (!requiresAuth && !auth.isTokenExpired() && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
