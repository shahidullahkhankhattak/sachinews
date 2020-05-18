<template>
  <q-page>
    <div class="p-pa-md news-container">
      <q-infinite-scroll @load="onScroll" :offset="250">
        <div class="row">
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
  name: 'TopStories',
  meta() {
    const pageTitle = `${this.$t('Top Stories')} - ${this.$t(title)}`;
    return {
      title: pageTitle,
      meta: {
        description: { name: 'description', content: this.$t('Get & scroll through the latest news to the current second stories from all the sources througout the globe') },
        ogTitle: { name: 'og:title', content: pageTitle },
        ogDescription: { name: 'og:description', content: this.$t('Get & scroll through the latest news to the current second stories from all the sources througout the globe') },
      },
    };
  },
  components: { NewsCard, NewsLoader, NoNews },
  computed: {
    ...getters,
  },
  watch: {
    $route(currentRoute) {
      const { query } = currentRoute;
      this.fetchStories.bind(this)({ refresh: true, query });
    },
  },
  methods: {
    ...actions,
    onScroll(_index, done) {
      const { query } = this.$route;
      if (this.stories.length >= this.total) return done();
      if (this.stories.length) {
        this.fetchStories.bind(this)({ done, query });
      }
    },
  },
  mounted() {
    const { prevRoute } = bus;
    if (prevRoute && prevRoute.name === 'story-details') { return; }
    handlePrefetch({ store: this.$store, currentRoute: this.$route }, true);
  },
  preFetch: handlePrefetch,
};
</script>
