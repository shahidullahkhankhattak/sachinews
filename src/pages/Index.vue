<template>
  <q-page>
    <div class="p-pa-md news-container">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div
              class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
              v-for="i in 20"
              :key="i"
            >
              <q-card
                class="news-card"
                flat
                bordered
              >
                <q-card-section horizontal>
                  <q-card-section class="q-pt-xs">
                    <div class="text-overline">Overline</div>
                    <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                    <div class="text-caption text-grey">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </div>
                  </q-card-section>

                  <q-card-section class="col-3 flex flex-right">
                    <q-img
                      class="rounded-borders"
                      src="https://cdn.quasar.dev/img/parallax2.jpg"
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
import { config } from '../config';

const {
  app: { logo },
} = config;
export default {
  data: () => ({
    logo,
  }),
  name: 'HomePage',
};
</script>
