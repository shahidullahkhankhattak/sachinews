<template>
  <div id="q-app" :style="{direction: siteDir}">
    <router-view />
  </div>
</template>

<script>
import { getters } from './components/Header/handleStore';
import { setLoading } from './config/configSetters';

export default {
  name: 'App',
  preFetch({ store }) {
    // prefetch examle
    return store.dispatch('App/setLocale', { value: 'english' });
    // initialize something in store here
  },
  computed: {
    ...getters,
  },
  mounted() {
    setLoading(false);
  },
};
</script>
