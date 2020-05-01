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

      <q-toolbar-title
        v-if="$q.screen.gt.sm"
        shrink
        class="row items-center no-wrap"
      >
        <span class="q-ml-sm" v-html="logo.html"></span>
      </q-toolbar-title>

      <q-space />

      <q-input
        class="GNL__toolbar-input"
        @focus="searchFocus = true"
        @blur="searchFocus = false"
        standout
        v-model="search"
        @keydown.enter="triggerSearch(search)"
        @keydown.esc="(e) => cancelSearch(e)"
        color="bg-grey-7 shadow-1"
        placeholder="Search for topics, authors & sources"
      >
        <template v-slot:prepend>
          <q-icon v-if="!searchFocus" name="search" />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="cancelSearch()"
          />
        </template>
      </q-input>

      <q-space />

      <div class="q-gutter-sm row items-center no-wrap">
        <q-select
          class="locale_select"
          map-options
          outlined
          behavior="menu"
          :value="locale"
          @input="setLocale"
          :options="langOptions"
          :dense="true"
          :options-dense="true"
        >
          <template v-slot:prepend>
            <q-icon name="g_translate" />
          </template>
        </q-select>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { getters } from './handleStore';
import { setLocale } from '../../config/configSetters';
import { config } from '../../config';

const {
  app: { logo },
} = config && config;

export default {
  data: () => ({
    logo,
    search: '',
    searchFocus: false,
    langOptions: [
      {
        label: 'English',
        value: 'english',
      },
      {
        label: 'اردو',
        value: 'urdu',
      },
    ],
  }),
  methods: {
    toggleSidebar() {
      this.$root.$emit('toggleSidebar');
    },
    setLocale,
    triggerSearch(keyword) {
      if (keyword && keyword.length >= 2) {
        this.$router.push(`/search/${keyword}`);
      }
    },
    cancelSearch(e) {
      if (e) e.target.blur();
      this.search = '';
      this.$router.push('/');
    },
  },
  computed: {
    locale: {
      get: getters.locale,
    },
  },
};
</script>
