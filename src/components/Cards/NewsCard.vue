<template>
  <q-card tag="article" class="news-card" flat bordered>
    <q-card-section :horizontal="$q.screen.gt.xs" :vertical="$q.screen.lt.xs">
      <q-card-section tag="header" class="q-pt-xs col-8">
        <div class="text-overline">
          {{ $t(news.source) }} - {{ $t(news.category || news.country) }}
        </div>
        <div>
          <q-badge
            v-if="isImportant(news)"
            color="red"
            class="animated infinite flash"
          >
            {{ $t("Important") }}
          </q-badge>
          <q-badge
            v-if="isLatest(news)"
            color="yellow"
            text-color="black"
            class="animated infinite bounceIn q-ml-sm"
          >
            {{ $t("Latest") }}
          </q-badge>
        </div>
        <router-link
          class="news-title-link"
          :to="news.link"
          :title="news.title"
        >
          <h3 class="text-h5 q-mt-sm q-mb-xs" v-html="news.title"></h3>
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
        <q-img
          class="rounded-borders"
          :src="news.media"
          :alt="news.title"
          style="max-height: 180px"
          height="100%"
          native-context-menu
        />
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
        <q-badge :color="(news.liked && 'red') || 'grey'" floating>{{
          news.likes
        }}</q-badge>
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
import { generateStoryUrl } from '../../utils/navigationHelpers';

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
        category: [{ name: category } = {}],
        country: [{ name: country } = {}],
      } = this.story;
      return {
        ...this.story,
        source,
        color,
        category,
        country,
        link: generateStoryUrl(this.locale, this.story, false),
        fullLink: generateStoryUrl(this.locale, this.story),
      };
    },
  },
  methods: {
    ...actions,
    isLatest(news) {
      const diff = (new Date() - new Date(news.created_date)) / 1000 / 60;
      if (diff < 30) {
        return true;
      }
      return false;
    },
    isImportant(news) {
      const { tags } = news;
      if (tags && tags.includes('important')) {
        return true;
      }
      return false;
    },
    timeAgo(time) {
      return timeAgoFn.format(new Date(time));
    },
  },
};
</script>
