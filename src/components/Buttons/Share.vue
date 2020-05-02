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
        <SocialShare :details="socialDetails" />
      </q-list>
    </q-btn-dropdown>
  </span>
</template>
<script>
import SocialShare from '../Sharing/SocialShare';

export default {
  props: ['details'],
  components: {
    SocialShare,
  },
  computed: {
    socialDetails() {
      return {
        ...this.details,
        url: `${document && document.location.origin}${this.details.link}`,
        hashtags: this.details.title.split(' ').join(','),
        quote: this.details.description,
      };
    },
  },
};
</script>
