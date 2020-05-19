<template>
  <q-page>
    <div class="p-pa-md news-container">
      <q-infinite-scroll @load="onScroll" :offset="250">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-xs-12">
                <q-card class="news-card text-center" flat bordered>
                  <q-card-section :horizontal="$q.screen.gt.xs" :vertical="$q.screen.lt.xs">
                    <q-card-section class="q-pt-xs col-12">
                      <div class="text-overline">{{ $t('Showing News For Source') }}</div>
                      <div class="text-h5 q-mt-sm q-mb-xs text-uppercase">
                        {{ $t($route.params.slug.replace(/[-_]/g, ' ')) }}
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
import NewsLoader from '../../components/Loaders/NewsLoader';
import NoNews from '../../components/Cards/NoNews';
import { config } from '../../config';
import bus from '../../utils/dataBus';

const { app: { logo: { title } } } = config;

export default {
  name: 'SourceStories',
  components: { NewsCard, NewsLoader, NoNews },
  meta() {
    const { slug } = this.$route.params;
    const source = this.sources.find((cat) => cat.slug === slug);
    const pageTitle = `${this.$t(source.name)} - ${this.$t(title)}`;
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
  computed: {
    ...getters,
  },
  watch: {
    $route(currentRoute) {
      const { slug } = currentRoute.params;
      const query = {
        source: slug,
      };
      this.fetchStories.bind(this)({ refresh: true, query });
    },
  },
  methods: {
    ...actions,
    onScroll(_index, done) {
      const { slug } = this.$route.params;
      const query = {
        source: slug,
      };
      if (this.stories.length >= this.total) return done();
      if (this.stories.length) {
        this.fetchStories.bind(this)({ done, query });
      }
    },
  },
  mounted() {
    const { prevRoute } = bus;
    if (prevRoute && prevRoute.name === 'story-details' && this.stories.length > 0) { return; }
    handlePrefetch({ store: this.$store, currentRoute: this.$route, redirect: this.$router.push }, true);
  },
  preFetch: handlePrefetch,
};
</script>
