<template>
  <q-layout view="hHh LpR fFf">
    <app-header />

    <sidebar />

    <q-page-container>
      <transition name="slide-bottom" mode="out-in" >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
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
  async preFetch(params) {
    const { store, currentRoute, redirect } = params;
    const { locale } = currentRoute.params;
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
