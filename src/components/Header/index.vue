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
          <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg">
          <span class="q-ml-sm">Bulletin</span>
        </q-toolbar-title>

        <q-space />

        <q-input class="GNL__toolbar-input" standout v-model="search" color="bg-grey-7 shadow-1" placeholder="Search for topics, authors & sources">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-select outlined v-model="locale" :options="['english', 'urdu']" :dense="true" :options-dense="true">
            <template v-slot:prepend>
              <q-icon name="language" />
            </template>
          </q-select>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
</template>

<script>
import { mapMutations } from 'vuex';
import { APP_TOGGLE_SIDEBAR } from '../../store/App/constants';
import { setters, getters } from './handleStore';

export default {
  data: () => ({
    search: '',
  }),
  methods: {
    ...mapMutations({
      toggleSidebar: APP_TOGGLE_SIDEBAR,
    }),
  },
  computed: {
    locale: {
      get: getters.locale,
      set: setters.setLocale,
    },
  },
};
</script>
