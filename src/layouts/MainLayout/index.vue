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
  async preFetch({ store }) {
    await preFetchMethods.fetchCategories({ store });
    return preFetchMethods.fetchSources({ store });
  },
  beforeMount() {
    if (!this.categories.length) {
      preFetchMethods.fetchCategories({ store: this.$store });
    }
  },
};
</script>
