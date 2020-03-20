
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      { path: '', component: () => import('pages/TopStories/Index.vue') },
      { path: '/trending', component: () => import('pages/Trending/Index.vue') },
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
