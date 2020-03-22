<template>
  <q-header elevated class="bg-white text-grey-8" height-hint="64">
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
          <span class="q-ml-sm" v-html="logo.html"></span>
        </q-toolbar-title>

        <q-space />
      </q-toolbar>
    </q-header>
</template>

<script>
import { config } from '../../../config';

const { app: { logoAdmin } } = config && config;

export default {
  data: () => ({
    logo: logoAdmin,
  }),
  methods: {
    toggleSidebar() {
      this.$root.$emit('toggleSidebarAdmin');
    },
  },
};
</script>
