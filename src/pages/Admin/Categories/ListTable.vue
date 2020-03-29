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
        title="Added Categories"
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

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td>
              <q-btn size="10px" round outline color="green-5">
                Urls
              </q-btn>
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
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { getters } from './handleStore';

export default {
  props: ['onDelete'],
  data: () => ({
    pagination: { rowsPerPage: 10 },
    filter: '',
    columns: [
      {
        name: 'name',
        label: 'Name',
        align: 'center',
        field: 'name',
        sortable: true,
      },
      {
        name: 'icon',
        align: 'center',
        label: 'Icon',
        field: 'icon',
        sortable: true,
      },
    ],
  }),
  computed: {
    ...getters,
  },
};
</script>
