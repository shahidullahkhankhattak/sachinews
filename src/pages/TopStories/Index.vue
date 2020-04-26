<template>
  <q-page>
    <div class="p-pa-md news-container">
      <transition name="slide-fade">
        <div class="q-pa-md q-gutter-sm" v-if="topStories.error">
          <q-banner rounded class="bg-red-5 col-6 text-white">
            <template v-slot:avatar>
              <q-icon name="error_outline" color="white" />
            </template>
            Couldn't fetch stories due to some temprory problem.
            <template v-slot:action>
              <q-btn
                flat
                color="white"
                label="Retry"
                @click="fetchTopStories"
              />
            </template>
          </q-banner>
        </div>
      </transition>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div
              class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
              v-for="{_id, source: { name: sourceName, color }, category: { name: categoryName }, title, description, media } in topStories.stories"
              :key="_id"
            >
              <q-card class="news-card" flat bordered>
                <q-card-section
                  :horizontal="$q.screen.gt.xs"
                  :vertical="$q.screen.lt.xs"
                >
                  <q-card-section class="q-pt-xs col-8">
                    <div class="text-overline">{{ sourceName }} - {{ categoryName }}</div>
                    <div
                      class="text-h5 q-mt-sm q-mb-xs"
                    >
                    {{ title }}
                    </div>
                    <div class="text-subtitle2"><time>1 hour ago</time></div>
                    <q-space/>
                    <div
                      class="text-caption text-grey-8 q-mt-sm"
                    >
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
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { config } from '../../config';
import { Actions } from '../../store/Stories/constants';
import { getters, setters } from './handleStore';

const {
  app: { logo },
} = config;

const { FETCH_TOP_STORIES } = Actions;

export default {
  name: 'TopStories',
  data: () => ({
    logo,
  }),
  computed: {
    ...getters,
  },
  methods: {
    ...setters,
  },
  preFetch({ store }) {
    return store.dispatch(FETCH_TOP_STORIES);
  },
};
</script>
