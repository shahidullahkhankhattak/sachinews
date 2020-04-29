
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      { path: '', name: 'top-stories', component: () => import('pages/TopStories') },
      { path: '/category/:slug', name: 'categories-stories', component: () => import('pages/Category') },
      { path: '/source/:slug', name: 'source-stories', component: () => import('pages/Source') },
      { path: '/search/:q', name: 'search-stories', component: () => import('pages/Search') },
      { path: '/trending', component: () => import('pages/Trending') },
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
    ],
  },
];

routes.push({
  path: '*',
  component: () => import('pages/Error404.vue'),
});

export default routes;
