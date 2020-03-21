<template>
  <div id="q-app" :dir="siteDir" :style="{direction: siteDir}">
    <transition name="fade" mode="out-in" appear>
      <router-view />
    </transition>
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
