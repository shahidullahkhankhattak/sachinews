<template>
  <q-page>
    <div class="p-pa-md news-container">
      <q-infinite-scroll @load="onScroll" :offset="0">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <!-- News cards [START] -->
              <div
                class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
                v-for="story in topStories.stories"
                :key="story._id"
              >
                <NewsCard :story="story" />
              </div>
              <!-- News cards [END] -->
              <NoNews v-if="!loading && !topStories.stories.length"/>
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

export default {
  name: 'TopStories',
  components: { NewsCard, NewsLoader, NoNews },
  computed: {
    ...getters,
  },
  watch: {
    $route(currentRoute) {
      const { slug } = currentRoute.params;
      const query = {
        category: slug,
      };
      this.fetchTopStories.bind(this)({ refresh: true, query });
    },
  },
  methods: {
    ...actions,
    onScroll(_index, done) {
      const { slug } = this.$route.params;
      const query = {
        category: slug,
      };
      if (this.topStories.stories.length) {
        this.fetchTopStories.bind(this)({ done, query });
      }
    },
  },
  preFetch: handlePrefetch,
};
</script>
