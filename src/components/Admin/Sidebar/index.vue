<template>
  <q-drawer
    ref="sidebar"
    show-if-above
    content-class="bg-white"
    :width="280"
  >
    <q-scroll-area class="fit">
      <q-list tag="nav" padding class="text-grey-8">
        <q-item
          v-ripple
          v-for="link in links1"
          :key="link.text"
          :to="link.link"
          :title="link.text"
          clickable
          class="GNL__drawer-item"
          :class="{
            active: isActive(link.pageName)
          }"
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
          v-for="link in links2"
          :to="link.link"
          :key="link.text"
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
          v-for="link in links3"
          :to="link.link"
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
              >About Us</a
            >
          </div>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
import { isSidebarLinkActive as isActive } from '../../../utils/navigationHelpers';

export default {
  data: () => ({
    sidebarKey: true,
    links1: [
      {
        icon: 'account_balance', text: 'Sources', link: '/admin/sources', pageName: 'dashboard-sources',
      },
      {
        icon: 'sports_baseball', text: 'Categories', link: '/admin/categories', pageName: 'dashboard-categories',
      },
      { icon: 'link', text: 'Source Links', link: '/admin/select-source?next=source-links' },
      { icon: 'show_chart', text: 'Selectors', link: '/admin/select-source?next=selectors' },
      { icon: 'translate', text: 'Languages', link: '/admin/languages' },
    ],
    links2: [
      { icon: 'input', text: 'Scrap Test', link: '/admin/scrap-test' },
      { icon: 'launch', text: 'Scrap Data', link: '/admin/scrap-data' },
    ],
    links3: [
      { icon: '', text: 'Translations', link: '/admin/translations' },
      { icon: '', text: 'Settings', link: '/admin/settings' },
    ],
  }),
  methods: {
    isActive,
  },
  mounted() {
    this.$root.$on('toggleSidebarAdmin', () => {
      this.$refs.sidebar.toggle();
    });
  },
};
</script>
