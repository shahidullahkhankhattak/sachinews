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
  computed: {
    ...getters,
  },
  mounted() {
    setLoading(false);
  },
};
</script>
