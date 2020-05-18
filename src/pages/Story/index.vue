<template>
  <q-page>
    <div class="p-pa-md news-container">
      <div class="row">
        <Story v-if="story" :story="story"/>
        <StoryLoader v-else />
      </div>
    </div>
  </q-page>
</template>
<script>
import Story from '../../components/Story';
import StoryLoader from '../../components/Loaders/StoryLoader';
import { getters, handlePrefetch } from './handleStore';

export default {
  meta() {
    if (!this.story) return {};
    return {
      title: this.story.title,
      meta: {
        description: { name: 'description', content: this.story.description },
        ogTitle: { name: 'og:title', content: `${this.story.title}` },
        dcTitle: { name: 'DC.title', content: this.story.title },
        ogDescription: { name: 'og:description', content: this.story.description },
        ogImage: { name: 'og:image', content: this.story.media },
        ogUrl: { name: 'og:url', content: this.story.url },
        keywords: { name: 'keywords', content: this.story.title.split(' ').join(', ') },
      },
    };
  },
  components: {
    Story,
    StoryLoader,
  },
  computed: {
    ...getters,
  },
  mounted() {
    handlePrefetch({ store: this.$store, currentRoute: this.$route, redirect: this.$router.push }, true);
  },
  preFetch: handlePrefetch,
};
</script>
