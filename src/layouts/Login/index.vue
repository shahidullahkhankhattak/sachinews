<template>
  <q-no-ssr>
    <q-layout view="hHh LpR fFf">
      <q-page-container>
        <transition name="slide-fade" mode="out-in" appear>
          <router-view />
        </transition>
      </q-page-container>
    </q-layout>
  </q-no-ssr>
</template>

<script>
import { setLoading } from '../../config/configSetters';

export default {
  name: 'Login',
  mounted() {
    setLoading(false);
  },
};
</script>
