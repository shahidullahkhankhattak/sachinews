<template>
  <q-drawer
    :key="sidebarKey"
    ref="sidebar"
    :persistent="true"
    content-class="bg-white"
    v-model="open"
    :side="sidebarPos"
    :width="280"
  >
    <q-scroll-area class="fit">
      <q-list tag="nav" padding class="text-grey-8">
        <q-item
          class="GNL__drawer-item"
          v-ripple
          v-for="link in links1"
          :key="link.text"
          :to="`/${locale.iso}/${link.link}`"
          :title="$t(link.text)"
          clickable
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t(link.text) }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset class="q-my-sm" />

        <q-item
          class="GNL__drawer-item"
          v-ripple
          v-for="link in categories"
          :key="link.name"
          :title="$t(link.name)"
          :to="`/${locale.iso}/category/${link.slug}`"
          clickable
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t(link.name) }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator inset class="q-my-sm" />
        <q-item
          class="GNL__drawer-item"
          v-ripple
          v-for="link in sources"
          :key="link.name"
          :to="`/${locale.iso}/source/${link.slug}`"
          :title="$t(link.name)"
          clickable
        >
          <q-item-section>
            <q-item-label>{{ $t(link.name) }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator inset class="q-my-sm" />

        <q-item
          class="GNL__drawer-item"
          v-ripple
          v-for="link in links3"
          :key="link.text"
          :title="$t(link.text)"
          clickable
        >
          <q-item-section>
            <q-item-label
              >{{ $t(link.text) }} <q-icon v-if="link.icon" :name="link.icon"
            /></q-item-label>
          </q-item-section>
        </q-item>

        <div class="q-mt-md">
          <div class="flex flex-center q-gutter-xs">
            <a
              class="GNL__drawer-footer-link"
              href="javascript:void(0)"
              aria-label="Privacy"
              :title="$t('Privacy')"
              >{{ $t('Privacy') }}</a
            >
            <span> · </span>
            <a
              class="GNL__drawer-footer-link"
              href="javascript:void(0)"
              aria-label="Terms"
              :title="$t('Terms')"
              >{{ $t('Terms') }}</a
            >
            <span> · </span>
            <a
              class="GNL__drawer-footer-link"
              href="javascript:void(0)"
              aria-label="About"
              :title="$t('About Us')"
              >{{ $t('About Us') }}</a
            >
          </div>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
import { Screen } from 'quasar';
import { getters } from './handleStore';
import { queryParams } from '../../utils/navigationHelpers';

export default {
  data: () => ({
    sidebarKey: true,
    open: false,
    links1: [
      { icon: 'web', text: 'Top stories', link: '' },
      { icon: 'trending_up', text: 'Trending', link: '/trending' },
      // { icon: 'person', text: 'For you' },
      // { icon: 'star_border', text: 'Favourites' },
      // { icon: 'search', text: 'Saved searches' },
    ],
    links3: [
      // { icon: '', text: 'Language & region' },
      // { icon: '', text: 'Settings' },
      // { icon: 'open_in_new', text: 'Get the Android app' },
      // { icon: 'open_in_new', text: 'Get the iOS app' },
      // { icon: '', text: 'Send feedback' },
      // { icon: 'open_in_new', text: 'Help' },
    ],
  }),
  computed: {
    ...getters,
  },
  methods: {
    generateQueryParam(name, value) {
      return queryParams(name, value, this.$route);
    },
  },
  watch: {
    sidebarPos() {
      this.sidebarKey = !this.sidebarKey;
    },
  },
  beforeMount() {
    this.open = Screen.gt.md;
  },
  mounted() {
    this.$root.$on('toggleSidebar', () => {
      setTimeout(() => this.$refs.sidebar && this.$refs.sidebar.toggle(), 1);
    });
  },
};
</script>
