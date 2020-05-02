<template>
  <article class="col-xs-12 col-lg-8 news-article q-pa-md">
    <div class="q-mb-md">
      <q-btn
        :icon="(siteDir === 'ltr' && 'arrow_back') || 'arrow_forward'"
        @click="$router.go(-1)"
      >
        {{ $t("Back") }}
      </q-btn>
    </div>
    <q-img
      class="q-mb-sm article-media"
      :src="story.media"
      height="400px"
      native-context-menu
    >
      <div
        class="absolute-bottom text-subtitle1 text-center"
        v-html="news.title"
      ></div>
    </q-img>
    <h1 class="article-title q-my-md" v-html="news.title"></h1>
    <div class="text-subtitle2 q-mb-md">
      <q-badge class="badge-sm" color="blue"
        ><time>{{ $td(timeAgo(news.created_date)) }}</time></q-badge
      >
      <q-badge class="q-ma-sm badge-sm" :color="story.color">{{
        $t(news.source)
      }}</q-badge>
      <a :href="news.url" target="_blank" class="no-deco">
        <q-badge class="badge-sm" outline color="primary"
          >{{ $t("View article on") }} {{ $t(news.source) }}
        </q-badge>
      </a>
      <div class="float-right">
        <q-btn
          flat
          round
          :color="(news.liked && 'red') || 'orange'"
          @click="likeStory({ id: news._id, main: true })"
          icon="whatshot"
        >
          <q-badge class="left" color="red" floating>{{ news.likes }}</q-badge>
        </q-btn>
        <!-- <q-btn flat round color="teal" icon="bookmark" /> -->
        <Share :details="news" />
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="article-body" v-html="news.body"></div>
  </article>
</template>
<script>
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Share from '../Buttons/Share';
import { getters, actions } from './handleStore';

TimeAgo.addLocale(en);
const timeAgoFn = new TimeAgo('en-US');

export default {
  props: ['story'],
  components: {
    Share,
  },
  methods: {
    ...actions,
    timeAgo(time) {
      return timeAgoFn.format(new Date(time));
    },
  },
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
};
</script>
