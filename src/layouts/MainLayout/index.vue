<template>
  <q-layout view="hHh LpR fFf">
    <app-header />

    <sidebar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Screen } from 'quasar';
import { preFetchMethods, getters } from './handleStore';

export default {
  name: 'MainLayout',
  meta() {
    const { locale } = this.$route.params;
    const language = this.languages.find((lang) => lang.iso === locale);
    return {
      htmlAttr: {
        lang: language.iso,
        dir: language.direction,
      },
    };
  },
  computed: {
    ...getters,
  },
  watch: {
    $route(to, from) {
      // toggle sidebar on language change
      if (from.params.locale !== to.params.locale && Screen.gt.sm) {
        this.$root.$emit('toggleSidebar');
      }
    },
  },
  async preFetch(params) {
    const { store, currentRoute, redirect } = params;
    const { locale } = currentRoute.params;
    const currentLocale = getters.locale.bind({ $store: store })();
    // trigger only on language change
    if (currentLocale && currentLocale.iso === locale) { return; }

    await preFetchMethods.fetchCategories(params);
    await preFetchMethods.fetchLanguages(params);
    const languages = getters.languages.bind({ $store: store })();
    const language = languages.find((lang) => lang.iso === locale);
    if (!language) { redirect(`/${locale}/404`); }
    await preFetchMethods.setLocale(params, language);
    await preFetchMethods.fetchTranslations(params, language);
    return preFetchMethods.fetchSources(params, language);
  },
};
</script>
