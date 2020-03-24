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
                  <q-breadcrumbs-el
                    to="/admin/sources"
                    label="sources"
                  />
                </q-breadcrumbs>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <!-- breadcrumb [END] -->

        <!-- add card [START] -->
        <div class="col-12">
          <div class="q-pa-md">
            <q-card class="main-card" flat bordered>
              <q-card-section>
                <q-card-section class="q-pt-xs col-xs-12">
                  <div class="text-overline">Sources</div>
                  <div class="text-h5 q-mt-sm q-mb-xs">Add Sources</div>
                  <div class="text-caption text-grey-8">
                    Please add sources below
                  </div>
                </q-card-section>
                <q-card-section class="q-pt-xs col-xs-12">
                  <div class="row">
                    <div class="col-md-4 q-pt-xs q-pr-xs">
                      <q-input outlined label="Source Name">
                        <template v-slot:prepend>
                          <q-icon name="home" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-md-4 q-pt-xs q-pr-xs">
                      <q-input outlined label="Website">
                        <template v-slot:prepend>
                          <q-icon name="link" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-md-4 q-pt-xs q-pr-xs">
                      <q-select
                        outlined
                        label="Language"
                        value="english"
                        :options="['english', 'urdu']"
                      >
                        <template v-slot:prepend>
                          <q-icon name="language" />
                        </template>
                      </q-select>
                    </div>
                  </div>

                  <div class="row q-pt-md">
                    <div class="col-12">
                      <q-btn outline color="green" size="16px">
                        <q-icon name="check"></q-icon>
                        <div class="q-ml-xs text-center">Add Source</div>
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
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

export default {
  components: {
    EditModal,
    ListTable,
  },
  methods: {
    confirmDelete() {
    },
    onDelete(item) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Do you really want to delete this?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        this.confirmDelete(item);
      });
    },
  },
};
</script>
