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
import { actions } from './components/Admin/Header/handleStore';
import { LOGOUT } from './sockets/constants';

export default {
  name: 'App',
  sockets: {
    error(error) {
      if (error === LOGOUT) {
        this.logout();
      }
    },
  },
  methods: {
    ...actions,
  },
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
