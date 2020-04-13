<style>
  span.color-box {
    display: inline-block;
    height:12px;
    width:12px;
  }
</style>
<template>
  <div class="col-12">
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        :grid="$q.screen.xs"
        title="Added Links"
        :data="list"
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
            <q-th auto-width> Actions </q-th>
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> Well this is sad... {{ message }} </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
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
                @click="$parent.$emit('edit', props.row)"
              >
              </q-btn>
              <q-btn
                size="10px"
                class="q-ml-xs"
                outline
                round
                color="red"
                icon="delete"
                @click="onDelete(props.row)"
              >
              </q-btn>
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <span v-if="col.name === 'category'">{{ getCategoryNameById(col.value) }}</span>
              <span v-else>{{ col.value }}</span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { getters, actions } from './handleStore';

export default {
  data: () => ({
    pagination: { rowsPerPage: 10 },
    filter: '',
    columns: [
      {
        name: 'url',
        label: 'Link',
        align: 'center',
        field: 'url',
        sortable: true,
      },
      {
        name: 'encoding',
        align: 'center',
        label: 'Encoding',
        field: 'encoding',
        sortable: true,
      },
      {
        name: 'category',
        align: 'center',
        label: 'Category',
        field: 'category',
        sortable: true,
      },
    ],
  }),
  computed: {
    ...getters,
  },
  methods: {
    ...actions,
    confirmDelete(item) {
      this.delete(item);
    },
    getCategoryNameById(id) {
      const { name = '' } = this.categories && this.categories.find((cat) => cat._id === id);
      return name;
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

};
</script>
