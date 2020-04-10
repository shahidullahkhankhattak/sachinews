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
import { config } from '../../config';

export default {
  name: 'Login',
  meta: config.app.meta,
};
</script>
