import Vue from 'vue';
import Vuex from 'vuex';

import App from './App';

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      App,
    },
    strict: process.env.DEV,
  });

  return Store;
}
