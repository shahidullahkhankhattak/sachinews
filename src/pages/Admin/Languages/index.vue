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
                  <q-breadcrumbs-el to="/admin/languages" label="languages" />
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
                  @submit="add({ form: addForm, reset: resetForm })"
                  @reset="resetFields()"
                  ref="addSourceForm"
                >
                  <q-card-section class="q-pt-xs col-xs-12">
                    <div class="text-overline">Languages</div>
                    <div class="text-h5 q-mt-sm q-mb-xs">Add Languages</div>
                    <div class="text-caption text-grey-8">
                      Please add languages below
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pt-xs col-xs-12">
                    <div class="row q-col-gutter-md">
                      <div class="col-md-4">
                        <q-input
                          outlined
                          label="Language Title"
                          v-model="addForm.name"
                          lazy-rules
                          :rules="[rules.REQUIRED]"
                        >
                          <template v-slot:prepend>
                            <q-icon name="home" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-md-4">
                        <q-input
                          outlined
                          label="Language ISO"
                          v-model="addForm.iso"
                          lazy-rules
                          :rules="[rules.REQUIRED]"
                        >
                          <template v-slot:prepend>
                            <q-icon name="translate" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-md-4">
                        <q-select
                          v-model="addForm.direction"
                          outlined
                          label="Direction"
                          value="rtl"
                          lazy-rules
                          :rules="[rules.REQUIRED]"
                          :options="['ltr', 'rtl']"
                        >
                          <template v-slot:prepend>
                            <q-icon name="swap_horizontal_circle" />
                          </template>
                        </q-select>
                      </div>
                    </div>

                    <div class="row q-pt-md">
                      <div class="col-12">
                        <q-btn type="submit" outline color="green" size="16px">
                          <q-icon name="check"></q-icon>
                          <div class="q-ml-xs text-center">Add Language</div>
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
import { formElems as addForm } from './common';

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
  },
  beforeMount() {
    this.fetch();
  },
};
</script>
