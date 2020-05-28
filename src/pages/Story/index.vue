<template>
  <q-page>
    <div class="p-pa-md news-container story-container">
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
import { generateStoryUrl } from '../../utils/navigationHelpers';

export default {
  meta() {
    if (!this.story) return {};
    return {
      title: this.story.title,
      meta: {
        description: { name: 'description', content: this.story.description },
        ogTitle: { property: 'og:title', content: `${this.story.title}` },
        dcTitle: { name: 'DC.title', content: this.story.title },
        ogDescription: { property: 'og:description', content: this.story.description },
        ogImage: { property: 'og:image', content: this.story.media },
        ogUrl: generateStoryUrl(this.locale, this.story),
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
