
const routes = [
  {
    path: '',
    redirect: '/en/',
  },
  {
    path: '/admin',
    meta: {
      auth: true,
      admin: true,
    },
    component: () => import('layouts/Admin'),
    children: [
      { path: '', name: 'dashboard', component: () => import('pages/Admin') },
      { path: 'sources', name: 'dashboard-sources', component: () => import('pages/Admin/Sources') },
      { path: 'categories', name: 'dashboard-categories', component: () => import('pages/Admin/Categories') },
      { path: 'source-links/:source_id', name: 'dashboard-source-links', component: () => import('pages/Admin/SourceLinks') },
      { path: 'selectors/:source_id', name: 'dashboard-selectors', component: () => import('src/pages/Admin/Selectors') },
      { path: 'select-source', name: 'dashboard-select-source', component: () => import('src/pages/Admin/SelectSource') },
      { path: 'scrap-test', name: 'dashboard-scrap-test', component: () => import('src/pages/Admin/ScrapTest') },
      { path: 'languages', name: 'dashboard-languages', component: () => import('src/pages/Admin/Languages') },
      { path: 'translations', name: 'dashboard-translations', component: () => import('src/pages/Admin/Translations') },
    ],
  },
  {
    path: '/login',
    meta: {
      guest: true,
    },
    component: () => import('layouts/Login'),
    children: [
      { path: '', name: 'login', component: () => import('pages/Login') },
    ],
  },
  {
    path: '/:locale/',
    component: () => import('layouts/MainLayout'),
    children: [
      { path: '', name: 'top-stories', component: () => import('pages/TopStories') },
      { path: '/404', component: () => import('pages/Error404.vue') },
      { path: 'category/:slug', name: 'categories-stories', component: () => import('pages/Category') },
      { path: 'source/:slug', name: 'source-stories', component: () => import('pages/Source') },
      { path: 'search/:q', name: 'search-stories', component: () => import('pages/Search') },
      { path: 'trending', name: 'trending-stories', component: () => import('pages/Trending') },
      { path: 'story/:id/:slug', name: 'story-details', component: () => import('pages/Story') },
    ],
  },
];

routes.push({
  path: '*',
  component: () => import('pages/Error404.vue'),
});

export default routes;
