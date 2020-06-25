<template>
  <q-layout view="hHh LpR fFf">
    <transition name="fade">
      <div v-show="ajaxBar" class="q-loading fullscreen column flex-center z-max text-white">
        <q-ajax-bar
          ref="bar"
          position="top"
          color="red"
          size="3px"
        />
      </div>
    </transition>
    <app-header />

    <sidebar />

    <q-page-container>
      <transition mode="out-in" name="slide-fade">
        <router-view :key="routeKey"/>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { Screen } from 'quasar';
import axios from 'axios';
import { preFetchMethods, getters } from './handleStore';
import { watcherBus } from '../../utils/dataBus';

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
  data() {
    return {
      ajaxBar: false,
    };
  },
  computed: {
    ...getters,
    routeKey() {
      return this.$route.params.slug || this.$route.name;
    },
  },
  watch: {
    $route(to, from) {
      // toggle sidebar on language change
      if (from.params.locale !== to.params.locale && Screen.gt.sm) {
        this.$root.$emit('toggleSidebar');
      }
      watcherBus.loading = true;
    },
  },
  async preFetch(params) {
    const {
      store, currentRoute, redirect, ssrContext,
    } = params;
    const { locale } = currentRoute.params;
    const currentLocale = getters.locale.bind({ $store: store })() || {};
    // trigger only on language change
    if (locale && currentLocale && currentLocale.iso === locale) { return; }
    await preFetchMethods.fetchCountries(params);
    const countries = getters.countries.bind({ $store: store })() || [];
    if (params.ssrContext) {
      const {
        req = { connection: {}, headers: {} } || {},
      } = ssrContext;
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      try {
        const { data: { countryCode } } = await axios.get(`http://ip-api.com/json/${ip}`);
        const country = countries.find((_country) => _country.iso === countryCode.toLowerCase());
        if (!locale) {
          if (!country) {
            return redirect('/en/');
          }
          return redirect(`/${country.lang.iso}/`);
        }
        preFetchMethods.setCountry(params, country);
      } catch (ex) {
        if (!locale) {
          return redirect('/en/');
        }
        preFetchMethods.setCountry(params, countries[0]);
      }
    }
    await preFetchMethods.fetchCategories(params);
    await preFetchMethods.fetchLanguages(params);
    const languages = getters.languages.bind({ $store: store })();
    const language = languages.find((lang) => lang.iso === locale);
    if (!language) { redirect(`/${locale}/404`); }
    await preFetchMethods.setLocale(params, language);
    await preFetchMethods.fetchTranslations(params, language);
    return preFetchMethods.fetchSources(params, language);
  },
  mounted() {
    watcherBus.on('loading', (loading) => {
      if (loading) {
        this.$refs.bar.start();
        this.ajaxBar = true;
      } else {
        setTimeout(() => {
          this.$refs.bar.stop();
          this.ajaxBar = false;
        }, 500);
      }
    });
  },
};
</script>
