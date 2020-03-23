<template>
  <q-layout view="hHh LpR fFf">

    <app-header />

    <sidebar />

    <q-page-container>
      <transition name="slide-fade" mode="out-in" appear>
        <router-view />
      </transition>
    </q-page-container>

  </q-layout>
</template>

<script>
import { setLoading } from '../../config/configSetters';

export default {
  name: 'MainLayout',
  mounted() {
    setLoading(false);
  },
};
</script>
