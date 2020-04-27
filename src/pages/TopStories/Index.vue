<template>
  <q-page>
    <div class="p-pa-md news-container">
      <q-infinite-scroll @load="onScroll" :offset="250">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div
                class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
                v-for="{
                  _id,
                  source: { name: sourceName, color },
                  category: { name: categoryName },
                  title,
                  description,
                  media
                } in topStories"
                :key="_id"
              >
                <q-card class="news-card" flat bordered>
                  <q-card-section
                    :horizontal="$q.screen.gt.xs"
                    :vertical="$q.screen.lt.xs"
                  >
                    <q-card-section class="q-pt-xs col-8">
                      <div class="text-overline">
                        {{ sourceName }} - {{ categoryName }}
                      </div>
                      <div class="text-h5 q-mt-sm q-mb-xs">
                        {{ title }}
                      </div>
                      <div class="text-subtitle2"><time>1 hour ago</time></div>
                      <q-space />
                      <div class="text-caption text-grey-8 q-mt-sm">
                        {{ description }}
                      </div>
                    </q-card-section>

                    <q-card-section class="col-4 flex flex-right">
                      <q-img
                        class="rounded-borders"
                        :src="media"
                        height="100%"
                      />
                    </q-card-section>
                  </q-card-section>

                  <q-card-actions>
                    <q-btn flat round icon="event" />
                  </q-card-actions>
                </q-card>
              </div>
              <div
                class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
                v-for="num in (loading && 20 || 0) "
                :key="num"
              >
                <q-card
                  class="news-card"
                  flat
                  bordered
                >
                  <q-card-section
                    :horizontal="$q.screen.gt.xs"
                    :vertical="$q.screen.lt.xs"
                  >
                    <q-card-section class="q-pt-xs col-8">
                      <q-skeleton width="40%" type="text" />
                      <q-skeleton
                        animation="blink"
                        class="text-h5 q-mt-sm q-mb-xs"
                      />
                      <q-skeleton animation="fade" width="100px" type="text" />
                      <q-skeleton class="q-mt-md" type="text" />
                      <q-skeleton type="text" />
                    </q-card-section>

                    <q-card-section class="col-4 flex flex-right">
                      <q-skeleton
                        animation="blink"
                        type="rect"
                        height="150px"
                        width="100%"
                      />
                    </q-card-section>
                  </q-card-section>

                  <q-card-actions>
                    <q-skeleton
                      class="q-mx-sm q-mb-sm"
                      type="QBtn"
                      width="35px"
                      height="30px"
                    />
                  </q-card-actions>
                </q-card>
              </div>
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

const {
  app: { logo },
} = config;

export default {
  name: 'TopStories',
  data: () => ({
    logo,
  }),
  computed: {
    ...getters,
  },
  methods: {
    ...actions,
    onScroll(index, done) {
      if (this.topStories.length) {
        this.fetchTopStories.bind(this)();
        done();
      }
    },
  },
  preFetch: handlePrefetch,
};
</script>
