<template>
  <q-drawer
    :key="sidebarKey"
    ref="sidebar"
    content-class="bg-white"
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
          :to="link.link"
          :title="link.text"
          clickable
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset class="q-my-sm" />

        <q-item
          class="GNL__drawer-item"
          v-ripple
          v-for="link in categories"
          :key="link.name"
          clickable
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.name }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset class="q-my-sm" />

        <q-item
          class="GNL__drawer-item"
          v-ripple
          v-for="link in links3"
          :key="link.text"
          clickable
        >
          <q-item-section>
            <q-item-label
              >{{ link.text }} <q-icon v-if="link.icon" :name="link.icon"
            /></q-item-label>
          </q-item-section>
        </q-item>

        <div class="q-mt-md">
          <div class="flex flex-center q-gutter-xs">
            <a
              class="GNL__drawer-footer-link"
              href="javascript:void(0)"
              aria-label="Privacy"
              >Privacy</a
            >
            <span> · </span>
            <a
              class="GNL__drawer-footer-link"
              href="javascript:void(0)"
              aria-label="Terms"
              >Terms</a
            >
            <span> · </span>
            <a
              class="GNL__drawer-footer-link"
              href="javascript:void(0)"
              aria-label="About"
              >About Google</a
            >
          </div>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
import { fasGlobeAmericas, fasFlask } from '@quasar/extras/fontawesome-v5';
import { getters } from './handleStore';

export default {
  data: () => ({
    sidebarKey: true,
    links1: [
      { icon: 'web', text: 'Top stories', link: '/' },
      { icon: 'trending_up', text: 'Trending', link: '/trending' },
      { icon: 'person', text: 'For you' },
      { icon: 'star_border', text: 'Favourites' },
      { icon: 'search', text: 'Saved searches' },
    ],
    links2: [
      { icon: 'flag', text: 'Canada' },
      { icon: fasGlobeAmericas, text: 'World' },
      { icon: 'place', text: 'Local' },
      { icon: 'domain', text: 'Business' },
      { icon: 'memory', text: 'Technology' },
      { icon: 'local_movies', text: 'Entertainment' },
      { icon: 'directions_bike', text: 'Sports' },
      { icon: fasFlask, text: 'Science' },
      { icon: 'fitness_center', text: 'Health ' },
    ],
    links3: [
      { icon: '', text: 'Language & region' },
      { icon: '', text: 'Settings' },
      { icon: 'open_in_new', text: 'Get the Android app' },
      { icon: 'open_in_new', text: 'Get the iOS app' },
      { icon: '', text: 'Send feedback' },
      { icon: 'open_in_new', text: 'Help' },
    ],
  }),
  computed: {
    ...getters,
  },
  watch: {
    sidebarPos() {
      this.sidebarKey = !this.sidebarKey;
    },
  },
  mounted() {
    this.$root.$on('toggleSidebar', () => {
      setTimeout(() => {
        this.$refs.sidebar.toggle();
      }, 1);
    });
  },
};
</script>
