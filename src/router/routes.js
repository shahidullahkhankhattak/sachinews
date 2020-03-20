
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      { path: '', component: () => import('pages/TopStories') },
      { path: '/trending', component: () => import('pages/Trending') },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/Login'),
    children: [
      { path: '', component: () => import('pages/Login') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
