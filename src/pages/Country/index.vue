<template>
  <q-page>
    <div class="p-pa-md news-container">
      <q-infinite-scroll @load="onScroll" :offset="400">
        <div class="row">
          <div class="col-xs-12">
            <q-card class="news-card text-center" flat bordered>
              <q-card-section :horizontal="$q.screen.gt.xs" :vertical="$q.screen.lt.xs">
                <q-card-section class="q-pt-xs col-12">
                  <div class="text-overline"> {{ $t('Showing News For Country') }}</div>
                  <div class="text-h5 q-mt-sm q-mb-xs text-uppercase">
                    {{ $t(currentCountry.name) }}
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
import { shouldReloadStories } from '../../utils/dataBus';

const { app: { logo: { title }, meta } } = config;

export default {
  name: 'CountryStories',
  meta() {
    const pageTitle = `${this.$t(this.country.name)} - ${this.$t(title)}`;
    return {
      title: pageTitle,
      meta: {
        description: { name: 'description', content: this.$t('Get & scroll through the latest news to the current second and explore stories from all the countries throughout the globe') },
        ogTitle: { property: 'og:title', content: pageTitle },
        dcTitle: { name: 'DC.title', content: pageTitle },
        ogDescription: { property: 'og:description', content: this.$t('Get & scroll through the latest news to the current second and explore stories from all the countries throughout the globe') },
        keywords: { name: 'keywords', content: this.$t('News,Country,Latest,Scroll,Through,sachinews,sachi,news,bulletin,addictive,addictive bulletin, sachi news, sachi, news') },
        ogImage: { property: 'og:image', content: `${meta.url}statics/logo/logo.png` },
        ogUrl: { property: 'og:url', content: meta.url },
      },
    };
  },
  components: { NewsCard, NewsLoader, NoNews },
  computed: {
    ...getters,
    currentCountry() {
      const { slug } = this.$route.params;
      return this.countries.find((country) => country.iso === slug);
    },
  },
  watch: {
    $route(currentRoute) {
      const { slug } = currentRoute.params;
      const query = {
        country: slug,
      };
      this.fetchStories.bind(this)({ refresh: true, query });
    },
  },
  methods: {
    ...actions,
    onScroll(_index, done) {
      const { slug } = this.$route.params;
      const query = {
        country: slug,
      };
      if (this.stories.length >= this.total) return done();
      if (this.stories.length) {
        this.fetchStories.bind(this)({ done, query });
      }
    },
  },
  mounted() {
    if (!shouldReloadStories(this)) return;
    handlePrefetch({ store: this.$store, currentRoute: this.$route, redirect: this.$router.push }, true);
  },
  preFetch: handlePrefetch,
};
</script>
