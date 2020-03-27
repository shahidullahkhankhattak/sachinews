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
                  <q-breadcrumbs-el to="/admin/sources" label="sources" />
                </q-breadcrumbs>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <!-- breadcrumb [END] -->

        <div class="col-12" v-if="errors">
          <div class="q-pa-md">
            <transition-group name="slide-fade">
              <div class="q-pa-md q-gutter-sm"  v-for="error in errors" :key="error.msg">
                <q-banner rounded class="bg-red-5 col-6 text-white">
                  <template v-slot:avatar>
                    <q-icon name="error_outline" color="white" />
                  </template>
                  {{ error.msg }}
                </q-banner>
              </div>
            </transition-group>
          </div>
        </div>

        <!-- add card [START] -->
        <div class="col-12">
          <div class="q-pa-md">
            <q-card class="main-card" flat bordered>
              <q-card-section>
                <q-form
                  @submit="addSource({ form: addForm, reset: resetForm })"
                  @reset="resetFields()"
                  ref="addSourceForm"
                >
                  <q-card-section class="q-pt-xs col-xs-12">
                    <div class="text-overline">Sources</div>
                    <div class="text-h5 q-mt-sm q-mb-xs">Add Sources</div>
                    <div class="text-caption text-grey-8">
                      Please add sources below
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pt-xs col-xs-12">
                    <div class="row">
                      <div class="col-md-4 q-pr-md">
                        <q-input
                          outlined
                          label="Source Name"
                          v-model="addForm.name"
                          lazy-rules
                          :rules="[rules.REQUIRED]"
                        >
                          <template v-slot:prepend>
                            <q-icon name="home" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-md-4 q-pr-md">
                        <q-input
                          outlined
                          label="Website"
                          v-model="addForm.website"
                          lazy-rules
                          :rules="[rules.URL, rules.REQUIRED]"
                        >
                          <template v-slot:prepend>
                            <q-icon name="link" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-md-4 q-pr-md">
                        <q-select
                          v-model="addForm.lang"
                          outlined
                          label="Language"
                          value="english"
                          lazy-rules
                          :rules="[rules.REQUIRED]"
                          :options="['english', 'urdu']"
                        >
                          <template v-slot:prepend>
                            <q-icon name="language" />
                          </template>
                        </q-select>
                      </div>
                      <div class="col-md-4 q-pr-md">
                        <q-input
                          outlined
                          label="Color"
                          v-model="addForm.color"
                          format-model="hex"
                          lazy-rules
                          :rules="[rules.HASH_COLOR, rules.REQUIRED]"
                          class="my-input"
                        >
                          <template v-slot:prepend>
                            <q-icon name="colorize" class="cursor-pointer">
                              <q-popup-proxy
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-color v-model="addForm.color" />
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                    </div>

                    <div class="row q-pt-md">
                      <div class="col-12">
                        <q-btn type="submit" outline color="green" size="16px">
                          <q-icon name="check"></q-icon>
                          <div class="q-ml-xs text-center">Add Source</div>
                        </q-btn>
                        <q-btn
                          label="Reset"
                          outline
                          size="16px"
                          type="reset"
                          color="primary"
                          class="q-ml-sm"
                        />
                      </div>
                    </div>
                  </q-card-section>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <!-- add card [END] -->

        <!-- list table [START] -->
        <ListTable :onDelete="onDelete" />
        <!-- list Table [END] -->
      </div>
    </div>
    <!-- main container [END] -->

    <!-- edit dialog [START] -->
    <EditModal />
    <!-- edit dialog [END] -->
  </q-page>
</template>
<script>
import EditModal from './EditModal';
import ListTable from './ListTable';
import { actions, getters } from './handleStore';
import { validations } from '../../../validators';

const addForm = () => ({
  name: '',
  website: '',
  lang: '',
  color: '',
});
export default {
  components: {
    EditModal,
    ListTable,
  },
  data() {
    return {
      rules: {
        ...validations,
      },
      addForm: addForm(),
    };
  },
  computed: {
    ...getters,
  },
  methods: {
    ...actions,
    resetFields() {
      this.addForm = addForm();
    },
    resetForm() {
      this.addForm = addForm();
      this.$refs.addSourceForm.reset();
    },
    confirmDelete(item) {
      this.deleteSource(item);
    },
    onDelete(item) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Do you really want to delete this?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.confirmDelete(item);
        });
    },
  },
  beforeMount() {
    this.fetchAllSources();
  },
};
</script>
