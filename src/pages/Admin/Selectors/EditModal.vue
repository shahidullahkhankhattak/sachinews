<template>
  <q-dialog
    v-model="show"
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
        <div class="text-h6">Edit Source</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="update({ item, toggleDialog })">
          <div class="row">
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-select
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                v-model="item.name"
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
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-input
                bg-color="white"
                color="blue-4"
                outlined
                label="Selector"
                v-model="item.selector"
                lazy-rules
                :rules="[rules.REQUIRED]"
              >
                <template v-slot:prepend>
                  <q-icon name="show_chart" />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-select
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                v-model="item.type"
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
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-input
                bg-color="white"
                color="blue-4"
                outlined
                label="Filter"
                v-model="item.filter"
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="filter" />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 q-pt-md">
              <q-btn type="submit" color="white" text-color="blue-8"
                >Submit</q-btn
              >
              <q-btn class="q-ml-md" @click="toggleDialog()" outline
                >Cancel</q-btn
              >
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { extend } from 'quasar';
import { actions } from './handleStore';
import { validations } from '../../../validators';
import { formElems as editForm, selectorNames } from './common';

export default {
  data: () => ({
    rules: {
      ...validations,
    },
    show: false,
    item: editForm(),
    selectorNames,
  }),
  methods: {
    ...actions,
    onEdit(item) {
      this.toggleDialog();
      extend(true, this.item, item);
    },
    toggleDialog() {
      this.show = !this.show;
    },
  },
  mounted() {
    this.$parent.$on('edit', this.onEdit);
  },
};
</script>
