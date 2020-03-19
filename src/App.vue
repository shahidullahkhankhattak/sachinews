<template>
  <div id="q-app" :style="{direction: siteDir}">
    <router-view />
  </div>
</template>

<script>
import { getters } from './components/Header/handleStore';

export default {
  name: 'App',
  computed: {
    ...getters,
  },
};
</script>
