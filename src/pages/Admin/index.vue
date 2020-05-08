<template>
  <q-page>
    <div class="p-pa-md main-container">
      <div class="row">
        <!-- breadcrumb [START] -->
        <div class="col-12">
          <div class="q-pa-md">
            <q-card class="main-card" flat bordered>
              <q-card-section>
                <q-breadcrumbs class="text-purple" active-color="blue">
                  <template v-slot:separator>
                    <q-icon size="1.2em" name="arrow_forward" color="purple" />
                  </template>
                  <q-breadcrumbs-el to="/admin" label="Home" icon="home" />
                </q-breadcrumbs>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <!-- breadcrumb [END] -->
      </div>
      <div class="row">
        <div class="col-md-3" v-for="(key, index) in Object.keys(counts)" :key="key">
          <div class="q-pa-md">
            <q-card class="my-card">
              <q-card-section :class="`${backgrounds[index]} text-white`">
                <div class="text-h6 text-capitalize">{{ key }}</div>
                <div class="text-subtitle2">{{ counts[key] }} {{key}} in database</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { getters, actions } from './handleStore';

export default {
  data() {
    return {
      backgrounds: [
        'bg-primary', 'bg-deep-purple-6', 'bg-green-6', 'bg-cyan-6', 'bg-deep-orange-6', 'bg-brown-6', 'bg-blue-grey-6', 'bg-teal-6',
      ],
    };
  },
  computed: {
    ...getters,
  },
  methods: {
    ...actions,
  },
  beforeMount() {
    this.fetchCounts();
  },
};
</script>
