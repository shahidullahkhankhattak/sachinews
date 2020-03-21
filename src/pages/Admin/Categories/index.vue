<template>
  <q-page>
    <div class="p-pa-md main-container">
      <div class="row">

        <!-- add card [START] -->
        <div class="col-12">
          <div class="q-pa-md">
            <q-card class="main-card" flat bordered>
              <q-card-section>
                <q-card-section class="q-pt-xs col-xs-12">
                  <div class="text-overline">Categories</div>
                  <div class="text-h5 q-mt-sm q-mb-xs">Add Categories</div>
                  <div class="text-caption text-grey-8">
                    Please add categories below
                  </div>
                </q-card-section>
                <q-card-section class="q-pt-xs col-xs-12">
                  <div class="row">
                    <div class="col-md-4 q-pt-xs q-pr-xs">
                      <q-input outlined label="Category Name">
                        <template v-slot:prepend>
                          <q-icon name="sports" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-md-4 q-pt-xs q-pr-xs">
                      <q-input outlined label="Icon">
                        <template v-slot:prepend>
                          <q-icon name="donut_small" />
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class="row q-pt-md">
                    <div class="col-12">
                      <q-btn outline color="green" size="16px">
                        <q-icon name="check"></q-icon>
                        <div class="q-ml-xs text-center">Add Category</div>
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
        <div class="col-12">
          <div class="q-pa-md">
            <q-table
              flat
              bordered
              :grid="$q.screen.xs"
              title="Added Categories"
              :data="data"
              :columns="columns"
              :pagination.sync="pagination"
              row-key="name"
              :filter="filter"
            >
              <template v-slot:top-right>
                <q-input outlined dense v-model="filter" placeholder="Search">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>

              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th auto-width class="text-left"> Actions </q-th>
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    auto-width
                  >
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td>
                    <q-btn
                      size="10px"
                      class="q-ml-xs"
                      outline
                      round
                      color="blue-5"
                      icon="edit"
                      @click="editDialog = !editDialog"
                    >
                    </q-btn>
                    <q-btn
                      size="10px"
                      class="q-ml-xs"
                      outline
                      round
                      color="red"
                      icon="delete"
                      @click="onDelete()"
                    >
                    </q-btn>
                  </q-td>
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    <q-icon v-if="col.name === 'icon'" :name="col.value" />
                    <span v-else>
                    {{ col.value }}
                    </span>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
        <!-- list Table [END] -->

      </div>
    </div>
    <!-- main container [END] -->

    <!-- edit dialog [START] -->
    <q-dialog
      v-model="editDialog"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-icon name="edit" />

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Edit Category</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-input
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                outlined
                label="Name"
              >
                <template v-slot:prepend>
                  <q-icon name="category" color="blue-4" />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-input
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                outlined
                label="Icon"
              >
                <template v-slot:prepend>
                  <q-icon name="donut_small" color="blue-4" />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 q-pt-md">
              <q-btn color="white" text-color="blue-8">Submit</q-btn>
              <q-btn class="q-ml-md" @click="editDialog = !editDialog" outline>Cancel</q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- edit dialog [END] -->

  </q-page>
</template>
<script>
export default {
  data() {
    return {
      editDialog: false,
      filter: '',
      pagination: { rowsPerPage: 10 },
      columns: [
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true,
        },
        {
          name: 'icon',
          label: 'Icon',
          align: 'left',
          field: 'icon',
        },
      ],
      data: [
        {
          name: 'Sports',
          icon: 'face',
        },
      ],
    };
  },
  methods: {
    onEdit() {},
    confirmDelete() {},
    onDelete(id) {
      this.$q.notify({
        timeout: 0,
        type: 'warning',
        icon: 'warning',
        message: 'Do you really want to delete this',
        position: 'top',
        actions: [
          {
            label: 'Ok',
            color: 'q-btn bg-red text-white',
            handler: () => this.confirmDelete(id),
          },
          {
            label: 'Cancel',
            color: 'white',
          },
        ],
      });
    },
  },
};
</script>
