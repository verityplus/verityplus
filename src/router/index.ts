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
    {
      path: '/author/:id',
      name: 'author',
      component: () => import('../views/AuthorView.tsx'),
    },
    // --- Content Management System (CMS) Routes ---
    {
      path: '/cms',
      component: () => import('../features/cms/views/CMSLayout.tsx'),
      children: [
        {
          path: '',
          name: 'cms-dashboard',
          component: () => import('../features/cms/views/DashboardView.tsx'),
          meta: { title: 'Dashboard | CMS' }
        },
        // Article CRUD
        {
          path: 'articles',
          name: 'cms-articles',
          component: () => import('../features/cms/views/ArticleListView.tsx'),
          meta: { title: 'Manage Articles | CMS' }
        },
        {
          path: 'articles/new',
          name: 'cms-articles-new',
          component: () => import('../features/cms/views/ArticleEditorView.tsx'),
          meta: { title: 'New Article | CMS' }
        },
        {
          path: 'articles/:slug/edit',
          name: 'cms-articles-edit',
          component: () => import('../features/cms/views/ArticleEditorView.tsx'),
          meta: { title: 'Edit Article | CMS' }
        },
        // Character CRUD
        {
          path: 'characters',
          name: 'cms-characters',
          component: () => import('../features/cms/views/CharacterListView.tsx'),
          meta: { title: 'Manage Characters | CMS' }
        },
        {
          path: 'characters/new',
          name: 'cms-characters-new',
          component: () => import('../features/cms/views/CharacterEditorView.tsx'),
          meta: { title: 'New Character | CMS' }
        },
        {
          path: 'characters/:id/edit',
          name: 'cms-characters-edit',
          component: () => import('../features/cms/views/CharacterEditorView.tsx'),
          meta: { title: 'Edit Character | CMS' }
        },
        // Category CRUD
        {
          path: 'categories',
          name: 'cms-categories',
          component: () => import('../features/cms/views/CategoryListView.tsx'),
          meta: { title: 'Manage Categories | CMS' }
        },
        {
          path: 'categories/new',
          name: 'cms-categories-new',
          component: () => import('../features/cms/views/CategoryEditorView.tsx'),
          meta: { title: 'New Category | CMS' }
        },
        {
          path: 'categories/:id/edit',
          name: 'cms-categories-edit',
          component: () => import('../features/cms/views/CategoryEditorView.tsx'),
          meta: { title: 'Edit Category | CMS' }
        },
        // User CRUD
        {
          path: 'users',
          name: 'cms-users',
          component: () => import('../features/cms/views/UserListView.tsx'),
          meta: { title: 'Manage Users | CMS' }
        },
        {
          path: 'users/new',
          name: 'cms-users-new',
          component: () => import('../features/cms/views/UserEditorView.tsx'),
          meta: { title: 'New User | CMS' }
        },
        {
          path: 'users/:id/edit',
          name: 'cms-users-edit',
          component: () => import('../features/cms/views/UserEditorView.tsx'),
          meta: { title: 'Edit User | CMS' }
        },
      ]
    }
  ],
})

/**
 * Universal Navigation Guard
 * Handles document titles and auth simulations.
 */
router.beforeEach((to, _from, next) => {
  // Update document title
  document.title = (to.meta.title as string) || 'Verity+ | Premium Modern News'

  // Basic CMS Auth Simulation
  if (to.path.startsWith('/cms')) {
    // In a real app, check for valid token/session here
    console.info('[CMS Guard] Admin authorization assumed for development.')
  }

  next()
})

export default router
