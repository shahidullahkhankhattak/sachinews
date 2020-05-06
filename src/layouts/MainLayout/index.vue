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
import { preFetchMethods, getters } from './handleStore';

export default {
  name: 'MainLayout',
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
    if (!language) { redirect('/404'); }
    await preFetchMethods.setLocale(params, language);
    await preFetchMethods.fetchTranslations(params, language);
    if (!process.browser) {
      params.ssrContext.Q_HTML_ATTRS = `lang=${language && language.iso} dir=${language && language.direction} %%Q_HTML_ATTRS%%`;
    } else {
      const html = document.querySelector('html');
      html.setAttribute('lang', language.iso);
      html.setAttribute('dir', language.direction);
    }
    return preFetchMethods.fetchSources(params, language);
  },
};
</script>
