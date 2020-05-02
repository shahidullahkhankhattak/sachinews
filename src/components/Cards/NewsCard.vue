<template>
  <q-card class="news-card" flat bordered>
    <q-card-section :horizontal="$q.screen.gt.xs" :vertical="$q.screen.lt.xs">
      <q-card-section class="q-pt-xs col-8">
        <div class="text-overline">
          {{ $t(news.source) }} - {{ $t(news.category) }}
        </div>
        <router-link
          class="news-title-link"
          :to="`/${locale.iso}/story/${story.slug}`"
        >
          <h2 class="text-h5 q-mt-sm q-mb-xs" v-html="news.title"></h2>
        </router-link>
        <div class="text-subtitle2">
          <time>{{ $td(timeAgo(story.created_date)) }}</time>
        </div>
        <q-space />
        <div
          class="text-caption text-grey-8 q-mt-sm"
          v-html="news.description"
        ></div>
      </q-card-section>

      <q-card-section class="col-4 flex flex-right">
        <q-img class="rounded-borders" :src="news.media" height="100%" />
      </q-card-section>
    </q-card-section>

    <q-card-actions>
      <q-btn
        @click="likeStory({ id: news._id })"
        flat
        round
        :color="(news.liked && 'red') || 'orange'"
        icon="whatshot"
      >
        <q-badge :color="(news.liked && 'red') || 'grey'" floating>{{ news.likes }}</q-badge>
      </q-btn>
      <Share />
      <!-- <q-btn flat round color="teal" icon="bookmark" /> -->
    </q-card-actions>
  </q-card>
</template>
<script>
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Share from '../../components/Buttons/Share';
import { getters, actions } from './handleStore';

TimeAgo.addLocale(en);
const timeAgoFn = new TimeAgo('en-US');
export default {
  components: {
    Share,
  },
  props: ['story'],
  computed: {
    ...getters,
    news() {
      const {
        source: [{ name: source, color }],
        category: [{ name: category }],
      } = this.story;
      return {
        ...this.story, source, color, category,
      };
    },
  },
  methods: {
    ...actions,
    timeAgo(time) {
      this.$t(time);
      return timeAgoFn.format(new Date(time));
    },
  },
};
</script>
