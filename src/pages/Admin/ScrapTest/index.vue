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
                  <q-breadcrumbs-el label="scrap test" />
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
                    <div class="text-overline">Scrap Test</div>
                    <div class="text-h5 q-mt-sm q-mb-xs">Test Scrap Links</div>
                    <div class="text-caption text-grey-8">
                      Please select a source below, select it's link and then click on Test
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
                        <div class="col-md-4">
                          <q-select
                            :disable="!form.source"
                            outlined
                            label="Source Link"
                            v-model="form.link"
                            lazy-rules
                            :option-value="opt => opt._id"
                            :option-label="opt => opt.url"
                            :rules="[rules.REQUIRED]"
                            :options="(linkList.length && linkList) || [{value: '', url: 'No Links found'}]"
                            map-options
                            emit-value
                          >
                            <template v-slot:prepend>
                              <q-icon name="home" />
                            </template>
                          </q-select>
                        </div>
                        <div class="col-md-12">
                          <q-btn type="submit" outline color="green" size="16px">
                            <q-icon name="check"></q-icon>
                            <div class="q-ml-xs text-center">Test</div>
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
    <!-- main container [END] -->
  </q-page>
</template>
<script>
import { validations } from '../../../validators';
import { actions, getters } from './handleStore';
import SocketEvents from '../../../sockets/constants';
import { ProtectedData } from '../../../utils/socketIoHelpers';

const {
  SCRAP_TEST,
} = SocketEvents;
export default {
  data() {
    return {
      redirect: '',
      form: {
        source: '',
        link: '',
      },
      rules: { ...validations },
    };
  },
  sockets: {
    connected() {
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
    next() {
      const data = {
        form: this.form,
      };
      this.$socket.emit(SCRAP_TEST, ProtectedData(data));
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
