import Vue from 'vue';
import Vuex from 'vuex';

import App from './App';
import Auth from './Auth';
import Sources from './Sources';
import Stories from './Stories';
import Categories from './Categories';

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      App,
      Auth,
      Sources,
      Stories,
      Categories,
    },
    strict: process.env.DEV,
  });
  return Store;
}
