
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      { path: '', name: 'top-stories', component: () => import('pages/TopStories') },
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
    ],
  },
];

routes.push({
  path: '*',
  component: () => import('pages/Error404.vue'),
});

export default routes;
