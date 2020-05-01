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
        <SelectLocale />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { config } from '../../config';
import SelectLocale from '../../components/Select/SelectLocale';

const {
  app: { logo },
} = config && config;

export default {
  components: {
    SelectLocale,
  },
  data: () => ({
    logo,
    search: '',
    searchFocus: false,
  }),
  methods: {
    toggleSidebar() {
      this.$root.$emit('toggleSidebar');
    },
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
};
</script>
