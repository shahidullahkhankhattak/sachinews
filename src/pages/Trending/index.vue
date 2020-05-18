<template>
  <q-page>
    <div class="p-pa-md news-container">
      <q-infinite-scroll @load="onScroll" :offset="0">
        <div class="row">
          <div class="col-xs-12">
            <q-card class="news-card text-center" flat bordered>
              <q-card-section :horizontal="$q.screen.gt.xs" :vertical="$q.screen.lt.xs">
                <q-card-section class="q-pt-xs col-12">
                  <div class="text-overline"> {{ $t('Showing News For') }}</div>
                  <div class="text-h5 q-mt-sm q-mb-xs text-uppercase">
                    {{ $t('Trending') }}
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12">
            <div class="row">
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
import bus from '../../utils/dataBus';

const { app: { logo: { title } } } = config;


export default {
  name: 'TrendingStories',
  meta() {
    const pageTitle = `${this.$t('Trending')} - ${this.$t(title)}`;
    return {
      title: pageTitle,
      meta: {
        description: { name: 'description', content: this.$t('Get & scroll through the latest news to the current second stories from all the sources througout the globe') },
        ogTitle: { name: 'og:title', content: pageTitle },
        dcTitle: { name: 'DC.title', content: pageTitle },
        ogDescription: { name: 'og:description', content: this.$t('Get & scroll through the latest news to the current second stories from all the sources througout the globe') },
        keywords: { name: 'keywords', content: this.$t('News,Category,Latest,Scroll,Through') },
      },
    };
  },
  components: { NewsCard, NewsLoader, NoNews },
  computed: {
    ...getters,
  },
  watch: {
    $route() {
      const query = {
        trending: true,
      };
      this.fetchStories.bind(this)({ refresh: true, query });
    },
  },
  methods: {
    ...actions,
    onScroll(_index, done) {
      const query = {
        trending: true,
      };
      if (this.stories.length >= this.total) return done();
      if (this.stories.length) {
        this.fetchStories.bind(this)({ done, query });
      }
    },
  },
  mounted() {
    const { prevRoute } = bus;
    if (prevRoute && prevRoute.name === 'story-details') { return; }
    handlePrefetch({ store: this.$store }, true);
  },
  preFetch: handlePrefetch,
};
</script>
