import { createRouter, createWebHistory } from 'vue-router'

/**
 * Global Routing Configuration
 * All routes point to TSX-based view components.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.tsx'),
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: () => import('../views/AboutUsView.tsx'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.tsx'),
    },
    {
      path: '/advertise',
      name: 'advertise',
      component: () => import('../views/AdvertiseView.tsx'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/PrivacyPolicyView.tsx'),
    },
    {
      path: '/terms-and-conditions',
      name: 'terms-and-conditions',
      component: () => import('../views/TermsAndConditionsView.tsx'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.tsx'),
    },
    {
      path: '/read/:slug',
      name: 'read',
      component: () => import('../views/ReadView.tsx'),
    },
  ],
})

export default router
