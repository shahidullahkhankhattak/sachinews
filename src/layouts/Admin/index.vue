<template>
  <q-no-ssr>
    <q-layout view="hHh LpR fFf">
      <admin-header />

      <admin-sidebar />

      <q-page-container>
        <transition name="slide-fade" mode="out-in" appear>
          <router-view />
        </transition>
      </q-page-container>
    </q-layout>
  </q-no-ssr>
</template>

<script>
import { actions } from './handleStore';

export default {
  name: 'AdminLayout',
  beforeMount() {
    actions.setJwtAuth.bind(this)();
  },
};
</script>
