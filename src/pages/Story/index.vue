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
    return {
      title: this.story && this.story.title,
      description: this.story && this.story.description,
    };
  },
  components: {
    Story,
    StoryLoader,
  },
  computed: {
    ...getters,
  },
  preFetch: handlePrefetch,
  beforeMount() {
    if (!this.loading && !this.story) {
      this.$router.push('/404');
    }
  },
};
</script>
