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
import { config } from '../../config';
import { preFetchMethods, getters } from './handleStore';

export default {
  name: 'MainLayout',
  meta: config.app.meta,
  computed: {
    ...getters,
  },
  async preFetch(params) {
    const { store, currentRoute } = params;
    const { locale } = currentRoute.params;
    await preFetchMethods.fetchCategories(params);
    await preFetchMethods.fetchLanguages(params);
    const languages = getters.languages.bind({ $store: store })();
    const language = languages.find((lang) => lang.iso === locale);
    await preFetchMethods.setLocale(params, language);
    await preFetchMethods.fetchTranslations({ store: this.$store }, language);
    return preFetchMethods.fetchSources(params, language);
  },
  async beforeMount() {
    if (!this.categories.length || !this.sources.length || !this.languages.length || !this.translations.length) {
      await preFetchMethods.fetchCategories({ store: this.$store });
      await preFetchMethods.fetchLanguages({ store: this.$store });
      const { locale } = this.$route.params;
      const language = this.languages.find((lang) => lang.iso === locale);
      if (!language) { this.$router.push('/404'); }
      await preFetchMethods.setLocale({ store: this.$store }, language);
      await preFetchMethods.fetchTranslations({ store: this.$store }, language);
      await preFetchMethods.fetchSources({ store: this.$store }, language);
    }
  },
};
</script>
