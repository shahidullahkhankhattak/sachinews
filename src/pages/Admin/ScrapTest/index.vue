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
                          <SelectGroup
                            label="Source"
                            @input="selectSource"
                            v-model="form.source"
                            option-value="_id"
                            option-label="name"
                            :rules="[rules.REQUIRED]"
                            :options="sourceOptions"
                            empty-msg="No source found"
                            emit-value
                            icon="home"
                          />
                        </div>
                        <div class="col-md-4">
                          <Select
                            :disabled="!form.source"
                            label="Source Link"
                            v-model="form.link"
                            option-value="_id"
                            option-label="url"
                            :rules="[rules.REQUIRED]"
                            :options="linkList"
                            empty-msg="No Link found"
                            emit-value
                            icon="home"
                          />
                        </div>
                        <div class="col-md-4">
                          <q-input
                            label="Number of items"
                            outlined
                            type="number"
                            v-model="form.numItems"
                            :rules="[rules.NUM_GT_0]"
                          />
                        </div>
                        <div class="col-md-12">
                          <q-btn :loading="loading" :disable="loading" type="submit" outline color="green" size="16px">
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

        <!-- stories cards [START] -->

        <div class="col-12">
          <div class="row">
            <div
              class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
              v-for="story in stories"
              :key="story.title"
            >
              <q-card class="news-card" flat bordered>
                <q-card-section
                  :horizontal="$q.screen.gt.xs"
                  :vertical="$q.screen.lt.xs"
                >
                  <q-card-section class="q-pt-xs col-8">
                    <div class="text-overline">{{ story.sourceName }}</div>
                    <div
                      @click="popup.details = story; popup.isOpen = true"
                      class="text-h5 q-mt-sm q-mb-xs cursor-pointer"
                      v-html="story.title"
                    ></div>
                    <div
                      class="text-caption text-grey-8"
                      v-html="story.description"
                    ></div>
                  </q-card-section>

                  <q-card-section class="col-4 flex flex-right">
                    <q-img
                      class="rounded-borders"
                      :src="story.media"
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
        <!-- stories cards [END] -->
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
import Select from '../../../components/Select/Select';
import SelectGroup from '../../../components/Select/SelectGroup';

const {
  adminEvents: {
    ADMIN_SCRAP_TEST,
  },
} = SocketEvents;
export default {
  components: {
    Story,
    SelectGroup,
    Select,
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
        link: '',
        numItems: 0,
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
    sourceOptions() {
      let index = 0;
      const groupHash = {};
      const groups = [];
      (this.list || []).forEach((value) => {
        if (groupHash[value.lang.name] || groupHash[value.lang.name] === 0) {
          groups[groupHash[value.lang.name]].children.push(value);
        } else {
          groupHash[value.lang.name] = index;
          groups[index] = {
            label: value.lang.name,
            children: [value],
          };
          index += 1;
        }
      });
      return groups;
    },
  },
  methods: {
    ...actions,
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
