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
      component: () => import('../features/pages/HomeView'),
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: () => import('../features/pages/AboutUsView'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../features/pages/ContactView'),
    },
    {
      path: '/advertise',
      name: 'advertise',
      component: () => import('../features/pages/AdvertiseView'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../features/pages/PrivacyPolicyView'),
    },
    {
      path: '/terms-and-conditions',
      name: 'terms-and-conditions',
      component: () => import('../features/pages/TermsAndConditionsView'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../features/search/views/SearchView'),
    },
    {
      path: '/read/:slug',
      name: 'read',
      component: () => import('../features/article/views/ReadView'),
    },
    {
      path: '/author/:id',
      name: 'author',
      component: () => import('../features/article/views/AuthorView'),
    },
    // --- Content Management System (CMS) Routes ---
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
        // Article CRUD
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
          path: 'articles/:slug/edit',
          name: 'cms-articles-edit',
          component: () => import('../features/cms/views/ArticleEditorView'),
          meta: { title: 'Edit Article | CMS' },
        },
        // Character CRUD
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
        // Category CRUD
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
        // User CRUD
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
      ],
    },
  ],
})

/**
 * Universal Navigation Guard
 * Handles document titles and auth simulations.
 */
router.beforeEach((to, _from, next) => {
  // Update document title
  document.title = (to.meta.title as string) || 'VERITY+'

  // Basic CMS Auth Simulation
  if (to.path.startsWith('/cms')) {
    // In a real app, check for valid token/session here
    console.info('[CMS Guard] Admin authorization assumed for development.')
  }

  next()
})

export default router
