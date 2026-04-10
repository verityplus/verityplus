import { createRouter, createWebHistory } from 'vue-router'
import { i18n, DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/i18n'
import type { Locale } from '@/i18n/types'
import { useAuthStore } from '@/features/cms/store/auth.store'

/**
 * Global Routing Configuration
 * All public routes are prefixed with /:locale(id|en|zh).
 * CMS routes stay at /cms without locale prefix.
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
      redirect: () => {
        const path = window.location.pathname
        const segments = path.split('/').filter(Boolean)
        const firstSegment = segments[0]
        if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment as Locale)) {
          return `/${firstSegment}`
        }
        const browserLang = navigator.language.split('-')[0]
        const detected = SUPPORTED_LOCALES.includes(browserLang as Locale)
          ? browserLang
          : DEFAULT_LOCALE
        return `/${detected}`
      },
    },

    {
      path: '/:locale(id|en|zh)',
      component: () => import('../features/pages/LocaleLayout'),
      children: [
        { path: '', name: 'home', component: () => import('../features/pages/HomeView') },
        {
          path: 'about-us',
          name: 'about-us',
          component: () => import('../features/pages/AboutUsView'),
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('../features/pages/ContactView'),
        },
        {
          path: 'advertise',
          name: 'advertise',
          component: () => import('../features/pages/AdvertiseView'),
        },
        {
          path: 'privacy-policy',
          name: 'privacy-policy',
          component: () => import('../features/pages/PrivacyPolicyView'),
        },
        {
          path: 'terms-and-conditions',
          name: 'terms-and-conditions',
          component: () => import('../features/pages/TermsAndConditionsView'),
        },
        {
          path: 'search',
          name: 'search',
          component: () => import('../features/search/views/SearchView'),
        },
        {
          path: 'read/:id',
          name: 'read',
          component: () => import('../features/article/views/ReadView'),
        },
        {
          path: 'author/:id',
          name: 'author',
          component: () => import('../features/article/views/AuthorView'),
        },
        {
          path: 'categories/:id',
          name: 'category',
          component: () => import('../features/article/views/CategoryView'),
        },
        {
          path: 'articles',
          name: 'all-articles',
          component: () => import('../features/article/views/AllArticlesView'),
        },
      ],
    },

    {
      path: '/cms/login',
      name: 'cms-login',
      component: () => import('../features/cms/views/LoginView'),
      meta: { title: 'Login | CMS' },
    },

    {
      path: '/cms',
      component: () => import('../features/cms/views/CMSLayout'),
      children: [
        {
          path: '',
          name: 'cms-dashboard',
          component: () => import('../features/cms/views/DashboardView'),
          meta: { title: 'Dashboard | CMS' },
        },
        {
          path: 'articles',
          name: 'cms-articles',
          component: () => import('../features/cms/views/ArticleListView'),
          meta: { title: 'Manage Articles | CMS' },
        },
        {
          path: 'articles/new',
          name: 'cms-articles-new',
          component: () => import('../features/cms/views/ArticleEditorView'),
          meta: { title: 'New Article | CMS' },
        },
        {
          path: 'articles/:id/edit',
          name: 'cms-articles-edit',
          component: () => import('../features/cms/views/ArticleEditorView'),
          meta: { title: 'Edit Article | CMS' },
        },
        {
          path: 'characters',
          name: 'cms-characters',
          component: () => import('../features/cms/views/CharacterListView'),
          meta: { title: 'Manage Characters | CMS' },
        },
        {
          path: 'characters/new',
          name: 'cms-characters-new',
          component: () => import('../features/cms/views/CharacterEditorView'),
          meta: { title: 'New Character | CMS' },
        },
        {
          path: 'characters/:id/edit',
          name: 'cms-characters-edit',
          component: () => import('../features/cms/views/CharacterEditorView'),
          meta: { title: 'Edit Character | CMS' },
        },
        {
          path: 'categories',
          name: 'cms-categories',
          component: () => import('../features/cms/views/CategoryListView'),
          meta: { title: 'Manage Categories | CMS' },
        },
        {
          path: 'categories/new',
          name: 'cms-categories-new',
          component: () => import('../features/cms/views/CategoryEditorView'),
          meta: { title: 'New Category | CMS' },
        },
        {
          path: 'categories/:id/edit',
          name: 'cms-categories-edit',
          component: () => import('../features/cms/views/CategoryEditorView'),
          meta: { title: 'Edit Category | CMS' },
        },
        {
          path: 'users',
          name: 'cms-users',
          component: () => import('../features/cms/views/UserListView'),
          meta: { title: 'Manage Users | CMS' },
        },
        {
          path: 'users/new',
          name: 'cms-users-new',
          component: () => import('../features/cms/views/UserEditorView'),
          meta: { title: 'New User | CMS' },
        },
        {
          path: 'users/:id/edit',
          name: 'cms-users-edit',
          component: () => import('../features/cms/views/UserEditorView'),
          meta: { title: 'Edit User | CMS' },
        },
        {
          path: 'analytics',
          name: 'cms-analytics',
          component: () => import('../features/cms/views/AnalyticsView'),
          meta: { title: 'Analytics | CMS' },
        },
      ],
    },

    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

/**
 * Universal Navigation Guard
 * Syncs i18n locale from route param, handles CMS auth, redirects invalid locales.
 */
router.beforeEach((to, _from, next) => {
  if (to.params.locale && typeof to.params.locale === 'string') {
    const locale = to.params.locale as Locale
    if (SUPPORTED_LOCALES.includes(locale)) {
      ;(i18n.global.locale as unknown as { value: string }).value = locale
    } else {
      return next(`/${DEFAULT_LOCALE}`)
    }
  }

  if (to.path.startsWith('/cms') && to.name !== 'cms-login') {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
      return next('/cms/login')
    }
  }

  next()
})

export default router
