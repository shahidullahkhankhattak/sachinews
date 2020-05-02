import Vue from 'vue';
import Vuex from 'vuex';

import App from './App';
import Auth from './Auth';
import Sources from './Sources';
import Stories from './Stories';
import Categories from './Categories';
import SourceLinks from './SourceLinks';
import Selectors from './Selectors';
import Languages from './Languages';
import Translations from './Translations';

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      App,
      Auth,
      Sources,
      Stories,
      Categories,
      SourceLinks,
      Selectors,
      Languages,
      Translations,
    },
    strict: process.env.DEV,
  });
  return Store;
}
