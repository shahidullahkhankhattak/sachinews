<template>
  <q-page>
    <div class="p-pa-md main-container q-mt-sm">
      <div class="row">
        <!-- breadcrumb [START] -->
        <div class="col-12">
          <div class="q-pa-sm">
            <q-card class="main-card" flat bordered>
              <q-card-section>
                <q-breadcrumbs class="text-purple" active-color="blue">
                  <template v-slot:separator>
                    <q-icon size="1.2em" name="arrow_forward" color="purple" />
                  </template>
                  <q-breadcrumbs-el to="/admin" label="Home" icon="home" />
                  <q-breadcrumbs-el label="scrap data" />
                </q-breadcrumbs>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <!-- breadcrumb [END] -->

        <!-- add card [START] -->
        <div class="col-12">
          <div class="q-pa-sm">
            <q-card class="main-card" flat bordered>
              <q-card-section>
                  <q-card-section class="q-pt-xs col-xs-12">
                    <div class="text-overline">Scrap Data</div>
                    <div class="text-h5 q-mt-sm q-mb-xs">Scrap Links</div>
                    <div class="text-caption text-grey-8">
                      Please select a source below and then click on Go
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <q-form @submit="next()">
                      <div class="row q-col-gutter-md">
                        <div class="col-md-4">
                          <q-select
                            outlined
                            label="Source"
                            :value="form.source"
                            v-model="form.source"
                            lazy-rules
                            @input="selectSource"
                            :option-value="opt => opt._id"
                            :option-label="opt => opt.name"
                            :rules="[rules.REQUIRED]"
                            :options="(list.length && list) || [{value: '', name: 'No sources found'}]"
                            map-options
                            emit-value
                          >
                            <template v-slot:prepend>
                              <q-icon name="home" />
                            </template>
                          </q-select>
                        </div>
                        <div class="col-md-12">
                          <q-btn :disable="!form.source" @click="openLink(`/api/v1/scrapper/source/${form.source}`)" outline color="green" size="16px">
                            <q-icon name="check"></q-icon>
                            <div class="q-ml-xs text-center">Go</div>
                          </q-btn>
                        </div>
                      </div>
                    </q-form>
                  </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <!-- add card [END] -->
      </div>
    </div>
    <q-dialog v-model="popup.isOpen">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <Story :story="popup.details" :isTest="true" />
      </q-layout>
    </q-dialog>
    <!-- main container [END] -->
  </q-page>
</template>
<script>
import { validations } from '../../../validators';
import { actions, getters } from './handleStore';
import SocketEvents from '../../../sockets/constants';
import { ProtectedData } from '../../../utils/socketIoHelpers';
import { Notify } from '../../../plugins/notify';
import Story from '../../../components/Story';

const {
  adminEvents: {
    ADMIN_SCRAP_TEST,
  },
} = SocketEvents;
export default {
  components: {
    Story,
  },
  data() {
    return {
      popup: {
        isOpen: false,
        details: {},
      },
      redirect: '',
      form: {
        source: '',
      },
      loading: false,
      rules: { ...validations },
      stories: [],
      scraped: 0,
    };
  },
  sockets: {
    connected() {
    },
    ADMIN_SCRAP_NEWS_ITEM(data) {
      this.stories.push(data);
      this.scraped -= 1;
      if (this.scraped === 0) {
        this.loading = false;
      }
    },
    ADMIN_ERROR(ERROR) {
      Notify({
        type: 'negative',
        message: ERROR,
      });
      this.loading = false;
    },
  },
  watch: {
    $route() {
      this.redirect = this.$route.query.next;
    },
  },
  computed: {
    ...getters,
  },
  methods: {
    ...actions,
    openLink(link) {
      const routeData = this.$router.resolve(link);
      window.open(routeData.href, '_blank');
    },
    next() {
      const data = {
        form: this.form,
      };
      this.stories = [];
      this.scraped = this.form.numItems;
      this.loading = true;
      this.$socket.emit(ADMIN_SCRAP_TEST, ProtectedData(data));
    },
    selectSource(val) {
      this.fetchCat.bind(this)(val);
    },
  },
  beforeMount() {
    this.fetch();
  },
  mounted() {
    this.redirect = this.$route.query.next;
  },
};
</script>
