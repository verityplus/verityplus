import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about-us',
      name: 'About Us',
      component: () => import('../views/AboutUsView.vue'),
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/advertise',
      name: 'Advertise',
      component: () => import('../views/AdvertiseView.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'Privacy Policy',
      component: () => import('../views/PrivacyPolicyView.vue'),
    },
    {
      path: '/terms-and-conditions',
      name: 'Terms and Conditions',
      component: () => import('../views/TermsAndConditionsView.vue'),
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/SearchView.vue'),
    },
    {
      path: '/read',
      name: 'Read',
      component: () => import('../views/ReadView.vue'),
    },
  ],
})

export default router
