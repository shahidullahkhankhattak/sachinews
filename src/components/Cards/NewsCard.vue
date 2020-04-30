<template>
  <q-card class="news-card" flat bordered>
    <q-card-section :horizontal="$q.screen.gt.xs" :vertical="$q.screen.lt.xs">
      <q-card-section class="q-pt-xs col-8">
        <div class="text-overline">{{ news.source }} - {{ news.category }}</div>
        <router-link class="news-title-link" :to="`/story/${story.slug}`">
          <h2 class="text-h5 q-mt-sm q-mb-xs">
            {{ news.title }}
          </h2>
        </router-link>
        <div class="text-subtitle2"><time>{{ timeAgo(story.created_date) }}</time></div>
        <q-space />
        <div class="text-caption text-grey-8 q-mt-sm">
          {{ news.description }}
        </div>
      </q-card-section>

      <q-card-section class="col-4 flex flex-right">
        <q-img class="rounded-borders" :src="news.media" height="100%" />
      </q-card-section>
    </q-card-section>

    <q-card-actions>
      <q-btn flat round color="red" icon="favorite_border" />
      <q-btn flat round color="teal" icon="bookmark" />
      <q-btn flat round color="primary" icon="share" />
    </q-card-actions>
  </q-card>
</template>
<script>
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgoFn = new TimeAgo('en-US');
export default {
  props: ['story'],
  computed: {
    news() {
      const {
        title, description, media, source: [{ name: source, color }], category: [{ name: category }], slug,
      } = this.story || { source: [{}], category: [{}] };
      return {
        source,
        category,
        slug,
        title,
        description,
        media,
        color,
      };
    },
  },
  methods: {
    timeAgo(time) {
      return timeAgoFn.format(new Date(time));
    },
  },
};
</script>
