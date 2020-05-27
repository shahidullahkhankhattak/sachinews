<template>
  <q-page>
    <div class="p-pa-md news-container">
      <q-infinite-scroll @load="onScroll" :offset="400">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-xs-12">
                <q-card class="news-card text-center" flat bordered>
                  <q-card-section :horizontal="$q.screen.gt.xs" :vertical="$q.screen.lt.xs">
                    <q-card-section class="q-pt-xs col-12">
                      <div class="text-overline">{{ $t(`Showing News For Search`) }}</div>
                      <div class="text-h5 q-mt-sm q-mb-xs text-uppercase">
                        {{ $t($route.params.q) }}
                      </div>
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </div>
              <!-- News cards [START] -->
              <div
                class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
                v-for="story in stories"
                :key="story._id"
              >
                <NewsCard :story="story" />
              </div>
              <!-- News cards [END] -->
              <NoNews v-if="!loading && !stories.length"/>
              <!-- Loaders section [START} -->
              <div
                class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
                v-for="num in (loading && perPage || 0) "
                :key="num"
              >
                <NewsLoader />
              </div>
              <!-- Loaders section [END}-->
            </div>
          </div>
        </div>
      </q-infinite-scroll>
    </div>
  </q-page>
</template>

<script>
import { getters, actions, handlePrefetch } from './handleStore';
import NewsCard from '../../components/Cards/NewsCard';
import NoNews from '../../components/Cards/NoNews';
import NewsLoader from '../../components/Loaders/NewsLoader';
import { config } from '../../config';
import { shouldReloadStories } from '../../utils/dataBus';

const { app: { logo: { title }, meta } } = config;

export default {
  name: 'CategoryStories',
  components: { NewsCard, NewsLoader, NoNews },
  meta() {
    const pageTitle = `${this.$t('Search')} - ${title}`;
    return {
      title: pageTitle,
      meta: {
        description: { name: 'description', content: this.$t('search within extensive collection of news from all the sources throughout the globe') },
        ogTitle: { property: 'og:title', content: pageTitle },
        dcTitle: { name: 'DC.title', content: pageTitle },
        ogDescription: { property: 'og:description', content: this.$t('search within extensive collection of news from all the sources throughout the globe') },
        keywords: { name: 'keywords', content: this.$t('News,Category,Latest,Scroll,Through,search,sachi,news,sachi news,addictive bulletin,addictive,bulletin, sachi,news,sachi news') },
        ogImage: { property: 'og:image', content: `${meta.url}statics/logo/logo.png` },
        ogUrl: { property: 'og:url', content: meta.url },
      },
    };
  },
  computed: {
    ...getters,
  },
  watch: {
    $route(currentRoute) {
      const { q } = currentRoute.params;
      const query = {
        search: q,
      };
      this.fetchStories.bind(this)({ refresh: true, query });
    },
  },
  methods: {
    ...actions,
    onScroll(_index, done) {
      const { q } = this.$route.params;
      const query = {
        search: q,
      };
      if (this.stories.length >= this.total) return done();
      if (this.stories.length) {
        this.fetchStories.bind(this)({ done, query });
      }
    },
  },
  mounted() {
    if (!shouldReloadStories(this)) return;
    handlePrefetch({ store: this.$store, currentRoute: this.$route }, true);
  },
  preFetch: handlePrefetch,
};
</script>
