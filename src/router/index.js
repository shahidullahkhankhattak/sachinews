import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAnalytics from 'vue-analytics';


import routes from './routes';
import bus from '../utils/dataBus';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
import bindAuth from './auth';

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: async (to, from, savedPosition) => {
      let topScroll = { x: 0, y: 0 };
      if (from.name === 'story-details' && to.name !== from.name) {
        topScroll = savedPosition || topScroll;
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(topScroll);
        }, 500);
      });
    },
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });
  Router.beforeEach((to, from, next) => {
    bus.subPrevRoute = { ...bus.prevRoute };
    bus.prevRoute = from;
    bus.nextRoute = to;
    next();
  });
  if (!process.env.SERVER) {
    Router.beforeEach(bindAuth);
  }

  Vue.use(VueAnalytics, {
    id: 'UA-106912900-4',
    disableScriptLoader: true,
    router: Router,
  });

  return Router;
}
