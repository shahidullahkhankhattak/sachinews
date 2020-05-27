<template>
  <q-header class="bg-white text-grey-8 shadow-up-3" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          @click="toggleSidebar()"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <img class="logo-img" :src="logo.path" />
        </q-toolbar-title>

        <q-space />
        <q-btn flat rounded class="btn-fixed-width shadow-1" @click="logout"> logout</q-btn>
      </q-toolbar>
    </q-header>
</template>

<script>
import { actions } from './handleStore';
import { config } from '../../../config';

const { app: { logoAdmin } } = config && config;

export default {
  data: () => ({
    logo: logoAdmin,
  }),
  methods: {
    ...actions,
    toggleSidebar() {
      this.$root.$emit('toggleSidebarAdmin');
    },
  },
};
</script>
