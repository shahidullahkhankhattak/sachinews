<template>
  <q-layout view="hHh LpR fFf">

    <app-header />

    <sidebar />

    <q-page-container>
      <transition name="slide-fade" mode="out-in" appear>
        <router-view />
      </transition>
    </q-page-container>

  </q-layout>
</template>

<script>
import { config } from '../../config';
import { preFetchMethods, getters } from './handleStore';

export default {
  name: 'MainLayout',
  meta: config.app.meta,
  computed: {
    ...getters,
  },
  async preFetch(params) {
    await preFetchMethods.fetchCategories(params);
    return preFetchMethods.fetchSources(params);
  },
  beforeMount() {
    if (!this.categories.length) {
      preFetchMethods.fetchCategories({ store: this.$store });
    }
  },
};
</script>
