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
                  <q-breadcrumbs-el label="selectors" />
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
                <q-form
                  @submit="add({ form: { ...addForm, source: source_id}, reset: resetForm })"
                  @reset="resetFields()"
                  ref="addSourceForm"
                >
                  <q-card-section class="q-pt-xs col-xs-12">
                    <div class="text-overline">Selectors</div>
                    <div class="text-h5 q-mt-sm q-mb-xs">Add Selectors</div>
                    <div class="text-caption text-grey-8">
                      Please add selectors below
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pt-xs col-xs-12">
                    <div class="row q-col-gutter-md">
                      <div class="col-md-4">
                        <q-select
                          v-model="addForm.name"
                          outlined
                          label="Data Name"
                          value=""
                          lazy-rules
                          :rules="[rules.REQUIRED]"
                          :options="selectorNames"
                        >
                          <template v-slot:prepend>
                            <q-icon name="home" />
                          </template>
                        </q-select>
                      </div>
                      <div class="col-md-4">
                        <q-select
                          outlined
                          label="Selector"
                          use-input
                          hide-selected
                          fill-input
                          lazy-rules
                          input-debounce="0"
                          @input-value="(val) => addForm.selector = val"
                          @filter="autoCompleteFilter"
                          v-model="addForm.selector"
                          :options="autoCompleteOptions"
                          :rules="[rules.REQUIRED]"
                        >
                          <template v-slot:prepend>
                            <q-icon name="show_chart" />
                          </template>
                        </q-select>
                      </div>
                      <div class="col-md-4">
                        <q-select
                          v-model="addForm.type"
                          outlined
                          label="Type"
                          value="string"
                          lazy-rules
                          :rules="[rules.REQUIRED]"
                          :options="['string', 'html', 'multi']"
                        >
                          <template v-slot:prepend>
                            <q-icon name="language" />
                          </template>
                        </q-select>
                      </div>
                      <div class="col-md-4">
                        <q-input
                          outlined
                          label="Filter"
                          v-model="addForm.filter"
                          lazy-rules
                        >
                          <template v-slot:prepend>
                            <q-icon name="filter" />
                          </template>
                        </q-input>
                      </div>
                    </div>

                    <div class="row q-pt-md">
                      <div class="col-12">
                        <q-btn type="submit" outline color="green" size="16px">
                          <q-icon name="check"></q-icon>
                          <div class="q-ml-xs text-center">Add Selector</div>
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
        <ListTable />
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
import { formElems as addForm, selectorNames } from './common';

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
      autoCompleteOptions: [],
      selectorNames,
    };
  },
  computed: {
    source_id() {
      return this.$route.params.source_id;
    },
    ...getters,
  },
  methods: {
    autoCompleteFilter(val, update) {
      update(() => {
        const needle = val.toLocaleLowerCase();
        this.autoCompleteOptions = this.autocomplete.filter((v) => v.toLocaleLowerCase().indexOf(needle) > -1);
      });
    },
    ...actions,
    resetFields() {
      this.addForm = addForm();
    },
    resetForm() {
      this.addForm = addForm();
      this.$refs.addSourceForm.reset();
    },
  },
  beforeMount() {
    if (!this.$route.params.source_id) { this.$router.push('/admin'); }
    this.fetch();
  },
};
</script>
