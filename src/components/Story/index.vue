<template>
  <article class="col-xs-12 col-lg-8 news-article q-pa-md">
    <q-img
      class="q-mb-sm article-media"
      :src="story.media"
      native-context-menu
    >
      <div class="absolute-bottom text-subtitle1 text-center">
        {{ story.title }}
      </div>
    </q-img>
    <h1 class="article-title q-my-md">
      {{ story.title }}
    </h1>
    <div class="text-subtitle2 q-mb-md">
      <time>{{timeAgo(story.created_date)}}</time> - <span>{{story.source.name}}</span>
    </div>
    <div class="article-body" v-html="story.body"></div>
  </article>
</template>
<script>
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgoFn = new TimeAgo('en-US');

export default {
  props: ['story'],
  methods: {
    timeAgo(time) {
      return timeAgoFn.format(new Date(time));
    },
  },
};
</script>
