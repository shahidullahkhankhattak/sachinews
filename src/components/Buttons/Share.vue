<template>
  <span class="relative-position q-mx-sm">
    <!-- <q-badge floating>5</q-badge> -->
    <q-btn-dropdown
      class="no-caret round"
      flat
      rounded
      color="primary"
      icon="share"
    >
      <q-list>
        <q-item clickable v-close-popup>
          <SocialShare :details="details" :type="'facebook'"/>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </span>
</template>
<script>
import SocialShare from '../Sharing/SocialShare';

export default {
  components: {
    SocialShare,
  },
  data() {
    return {
      details: {
        url: 'https://vuejs.org/',
        title: 'The Progressive JavaScript Framework',
        hashtags: 'vue, javascript, meta',
        quote: 'Vue is a progressive framework for building user interfaces.',
        description: 'Intuitive, Fast and Composable MVVM for building interactive interfaces.',
      },
    };
  },
};
</script>
