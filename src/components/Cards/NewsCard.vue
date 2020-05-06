<template>
  <q-card tag="article" class="news-card" flat bordered>
    <q-card-section :horizontal="$q.screen.gt.xs" :vertical="$q.screen.lt.xs">
      <q-card-section tag="header" class="q-pt-xs col-8">
        <div class="text-overline">
          {{ $t(news.source) }} - {{ $t(news.category) }}
        </div>
        <router-link
          class="news-title-link"
          :to="news.link"
          :title="news.title"
        >
          <h2 class="text-h5 q-mt-sm q-mb-xs" v-html="news.title"></h2>
        </router-link>
        <div class="text-subtitle2">
          <time>{{ $td(timeAgo(story.created_date)) }}</time>
        </div>
        <q-space />
        <p
          class="text-caption text-grey-8 q-mt-sm"
          v-html="news.description"
        ></p>
      </q-card-section>

      <q-card-section class="col-4 flex flex-right">
        <q-img class="rounded-borders" :src="news.media" :alt="news.title" height="100%" native-context-menu/>
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
      <Share :details="news" />
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
        ...this.story,
        source,
        color,
        category,
        link: `/${this.locale.iso}/story/${this.story._id}/${this.story.slug}`,
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
