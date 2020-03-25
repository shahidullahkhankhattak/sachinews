import Vue from 'vue';
import Vuex from 'vuex';

import App from './App';
import Auth from './Auth';
import Sources from './Sources';
import Stories from './Stories';

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      App,
      Auth,
      Sources,
      Stories,
    },
    strict: process.env.DEV,
  });
  return Store;
}
