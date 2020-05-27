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
      <q-list tag="nav" class="text-grey-8" :class="{'q-pt-md': $q.screen.gt.sm}">
        <q-item style="padding:0" v-if="$q.screen.lt.md">
          <img class="sidebar-logo" :src="logo.sidebarPath" :alt="$t(logo.alt.sidebarLogo)">
        </q-item>
        <q-separator inset class="q-my-sm" v-if="$q.screen.lt.md"/>
        <q-item
          class="GNL__drawer-item"
          v-ripple
          v-for="link in topLinks"
          :key="link.text"
          :to="link.link"
          :title="$t(link.text)"
          @click="hideSidebar()"
          :class="{ active: isActive(link) }"
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
          v-for="link in categoryLinks"
          :key="link.name"
          :title="$t(link.name)"
          :to="link.link"
          @click="hideSidebar()"
          :class="{ active: isActive(link) }"
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
          v-for="link in sourceLinks"
          :key="link.name"
          :to="link.link"
          :title="$t(link.name)"
          @click="hideSidebar()"
          :class="{ active: isActive(link) }"
          clickable
        >
          <q-item-section>
            <q-item-label>{{ $t(link.name) }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset class="q-my-sm" v-if="countryLinks.length" />

        <q-item
          class="GNL__drawer-item"
          v-ripple
          v-for="link in countryLinks"
          :key="link.name"
          :to="link.link"
          :title="$t(link.name)"
          @click="hideSidebar()"
          :class="{ active: isActive(link) }"
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
          @click="hideSidebar()"
          :class="{ active: isActive(link) }"
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
              >{{ $t("Privacy") }}</a
            >
            <span> · </span>
            <a
              class="GNL__drawer-footer-link"
              href="javascript:void(0)"
              aria-label="Terms"
              :title="$t('Terms')"
              >{{ $t("Terms") }}</a
            >
            <span> · </span>
            <a
              class="GNL__drawer-footer-link"
              href="javascript:void(0)"
              aria-label="About"
              :title="$t('About Us')"
              >{{ $t("About Us") }}</a
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
import {
  queryParams,
  isSidebarLinkActive as isActive,
} from '../../utils/navigationHelpers';
import {
  config,
} from '../../config';

const {
  app: { logo },
} = config && config;

export default {
  data: () => ({
    logo,
    sidebarKey: true,
    open: false,
    topUrls: [
      { icon: 'web', text: 'Latest', link: '' },
      { icon: 'trending_up', text: 'Trending', link: 'trending' },
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
    countryLinks() {
      return this.countries.map((country) => ({
        ...country,
        link: `/${this.locale.iso}/country/${country.iso}`,
      }));
    },
    topLinks() {
      return this.topUrls.map((item) => ({
        ...item,
        link: `/${this.locale.iso}/${item.link}`,
      }));
    },
    categoryLinks() {
      const { country } = this;
      const links = [];
      if (this.countries.length && country) {
        links.push({ name: this.$t('National'), link: `/${this.locale.iso}/country/${country.iso}/`, icon: 'flag' });
      }
      links.push(...this.categories.map((cat) => ({
        ...cat,
        link: `/${this.locale.iso}/category/${cat.slug}`,
      })));
      return links;
    },
    sourceLinks() {
      return this.sources.map((source) => ({
        ...source,
        link: `/${this.locale.iso}/source/${source.slug}`,
      }));
    },
  },
  methods: {
    isActive,
    generateQueryParam(name, value) {
      return queryParams(name, value, this.$route);
    },
    hideSidebar() {
      if (Screen.lt.md) {
        this.$refs.sidebar.hide();
      }
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
