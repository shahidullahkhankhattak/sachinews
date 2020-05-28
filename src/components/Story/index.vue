<template>
  <article class="col-xs-12 col-lg-8 q-pa-md news-article">
    <div class="q-mb-md" v-if="!isTest">
      <q-btn
        :icon="(siteDir === 'ltr' && 'arrow_back') || 'arrow_forward'"
        @click="closeStory()"
      >
        {{ $t("Back") }}
      </q-btn>
    </div>
    <q-img
      class="q-mb-sm article-media"
      :src="news.media"
      :alt="news.title"
      native-context-menu
    >
      <div
        class="absolute-bottom text-subtitle1 text-center"
        v-html="news.title"
      ></div>
    </q-img>
    <header>
      <h1
        :aria-label="news.title"
        class="article-title q-my-md"
        v-html="news.title"
      ></h1>
    </header>
    <div class="text-subtitle2 q-mb-md" v-if="!isTest">
      <q-badge class="badge-sm" color="blue">
        <time>{{ $td(timeAgo(news.created_date)) }}</time>
      </q-badge>
      <q-badge class="q-ma-sm badge-sm" :style="{ background: news.color }">
        {{ $t(news.source) }}
      </q-badge>
      <a
        :href="news.url"
        :title="$t(news.source)"
        target="_blank"
        class="no-deco"
      >
        <q-badge class="badge-sm" outline color="primary"
          >{{ $t("View article on") }} {{ $t(news.source) }}
        </q-badge>
      </a>
      <div v-if="$q.screen.lt.sm">
        <br />
      </div>
      <div class="float-right">
        <q-btn
          flat
          round
          aria-label="like news"
          :color="(news.liked && 'red') || 'orange'"
          @click="likeStory({ id: news._id, main: true })"
          icon="whatshot"
        >
          <q-badge
            class="left"
            color="red"
            :aria-label="`there are ${news.likes} likes on the news`"
            floating
            >{{ news.likes }}</q-badge
          >
        </q-btn>
        <!-- <q-btn flat round color="teal" icon="bookmark" /> -->
        <Share :details="news" />
      </div>
      <div class="clearfix"></div>
    </div>
    <div
      class="article-body"
      :aria-label="news.description"
      v-html="news.body"
    ></div>
  </article>
</template>
<script>
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Share from '../Buttons/Share';
import { getters, actions } from './handleStore';
import { canGoBack } from '../../utils/dataBus';
import { generateStoryUrl } from '../../utils/navigationHelpers';

TimeAgo.addLocale(en);
const timeAgoFn = new TimeAgo('en-US');

export default {
  props: ['story', 'isTest'],
  components: {
    Share,
  },
  methods: {
    ...actions,
    timeAgo(time) {
      return timeAgoFn.format(new Date(time));
    },
    closeStory() {
      if (!canGoBack()) {
        this.$router.push(`/${this.locale.iso}/`);
      } else {
        this.$router.go(-1);
      }
      this.clearStory.bind(this)();
    },
  },
  computed: {
    ...getters,
    news() {
      const {
        source: [{ name: source, color } = {}] = [],
        category: [{ name: category } = {}] = [],
        country: [{ name: country } = {}] = [],
      } = this.story;
      return {
        ...this.story,
        source,
        color,
        category,
        country,
        link: !this.isTest && generateStoryUrl(this.locale, this.story),
        fullLink: !this.isTest && generateStoryUrl(this.locale, this.story),
      };
    },
  },
};
</script>
