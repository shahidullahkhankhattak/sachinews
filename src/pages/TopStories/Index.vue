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
                v-for="story in topStories.stories"
                :key="story._id"
              >
                <NewsCard :story="story" />
              </div>
              <!-- News cards [END] -->

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
import { config } from '../../config';
import { getters, actions, handlePrefetch } from './handleStore';
import NewsCard from '../../components/Cards/NewsCard';
import NewsLoader from '../../components/Loaders/NewsLoader';

const {
  app: { logo },
} = config;

export default {
  name: 'TopStories',
  components: { NewsCard, NewsLoader },
  data: () => ({
    logo,
  }),
  computed: {
    ...getters,
  },
  methods: {
    ...actions,
    onScroll(_index, done) {
      if (this.topStories.stories.length) {
        this.fetchTopStories.bind(this)(done);
      }
    },
  },
  preFetch: handlePrefetch,
};
</script>
