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
          v-for="link in links2"
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
export default {
  data: () => ({
    sidebarKey: true,
    links1: [
      { icon: 'account_balance', text: 'Sources', link: '/admin/sources' },
      { icon: 'sports_baseball', text: 'Categories', link: '/admin/categories' },
      { icon: 'show_chart', text: 'Source Datapath', link: '/admin/source-datapath' },
      { icon: 'link', text: 'Source Links', link: '/admin/source-links' },
    ],
    links2: [
      { icon: 'g_translate', text: 'Translations' },
    ],
    links3: [
      { icon: '', text: 'Settings' },
    ],
  }),
  mounted() {
    this.$root.$on('toggleSidebar', () => {
      setTimeout(() => {
        this.$refs.sidebar.toggle();
      });
    });
  },
};
</script>
