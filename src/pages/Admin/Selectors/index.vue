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
                        <Select
                          v-model="addForm.name"
                          label="Data Name"
                          :rules="[rules.REQUIRED]"
                          @input="onDataNameChange()"
                          :options="selectorNames"
                          icon="home"
                          />
                      </div>
                      <div class="col-md-4">
                        <Select
                          v-model="addForm.selector"
                          label="Selector"
                          use-input
                          hide-selected
                          fill-input
                          :input-value="(val) => addForm.selector = val"
                          :filter="autoCompleteFilter"
                          :options="autoCompleteOptions"
                          :rules="[rules.REQUIRED]"
                          icon="show_chart"
                          />
                      </div>
                      <div class="col-md-4">
                        <Select
                          v-model="addForm.type"
                          label="Type"
                          :rules="[rules.REQUIRED]"
                          :options="['string', 'html', 'multi']"
                          icon="language"
                          />
                      </div>
                      <div class="col-md-4">
                        <Select
                          v-model="addForm.filter"
                          label="Filter"
                          use-input
                          hide-selected
                          fill-input
                          :input-value="(val) => addForm.filter = val"
                          :filter="autoCompleteFilterFilter"
                          :options="autoCompleteFilterOptions"
                          icon="show_chart"
                          />
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
import Select from '../../../components/Select/Select';

export default {
  components: {
    EditModal,
    ListTable,
    Select,
  },
  data() {
    return {
      rules: {
        ...validations,
      },
      addForm: addForm(),
      autoCompleteOptions: [],
      autoCompleteFilterOptions: [],
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
    onDataNameChange() {
      if (this.addForm.name === 'body') { this.addForm.type = 'html'; } else this.addForm.type = 'string';
    },
    autoCompleteFilter(val, update) {
      update(() => {
        const needle = val.toLocaleLowerCase();
        this.autoCompleteOptions = this.autocomplete.filter((v) => v.toLocaleLowerCase().indexOf(needle) > -1);
      });
    },
    autoCompleteFilterFilter(val, update) {
      update(() => {
        const needle = val.toLocaleLowerCase();
        this.autoCompleteFilterOptions = this.autocompleteFilter.filter((v) => v.toLocaleLowerCase().indexOf(needle) > -1);
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
