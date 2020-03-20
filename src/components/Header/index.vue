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
          <span class="q-ml-sm"><font color="red">Addictive</font> Bulletin</span>
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
          <q-select outlined :value="locale" @input="setLocale" :options="langOptions" :dense="true" :options-dense="true">
            <template v-slot:prepend>
              <q-icon name="language" />
            </template>
          </q-select>
        </div>
      </q-toolbar>
    </q-header>
</template>

<script>
import { getters } from './handleStore';
import { setLocale } from '../../config/configSetters';

export default {
  data: () => ({
    search: '',
    langOptions: [
      {
        label: 'English',
        value: 'english',
      },
      {
        label: 'Urdu',
        value: 'urdu',
      },
    ],
  }),
  methods: {
    toggleSidebar() {
      this.$root.$emit('toggleSidebar');
    },
    setLocale,
  },
  computed: {
    locale: {
      get: getters.locale,
    },
  },
};
</script>
