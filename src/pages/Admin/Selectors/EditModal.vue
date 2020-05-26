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
              <Select
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                v-model="item.name"
                label="Data Name"
                :rules="[rules.REQUIRED]"
                :options="selectorNames"
                icon="home"
              />
            </div>
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <Select
                bg-color="white"
                color="blue-4"
                label="Selector"
                v-model="item.selector"
                use-input
                hide-selected
                fill-input
                :input-value="(val) => item.selector = val"
                :filter="autoCompleteFilter"
                :options="autoCompleteOptions"
                :rules="[rules.REQUIRED]"
                icon="show_chart"
              />
            </div>
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <Select
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                v-model="item.type"
                label="Type"
                value="string"
                :rules="[rules.REQUIRED]"
                :options="['string', 'html', 'multi']"
                icon="language"
              />
            </div>
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <Select
                bg-color="white"
                color="blue-4"
                label="Filter"
                v-model="item.filter"
                use-input
                hide-selected
                fill-input
                :input-value="(val) => item.filter = val"
                :filter="autoCompleteFilterFilter"
                :options="autoCompleteFilterOptions"
                icon="filter"
              />
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
import { actions, getters } from './handleStore';
import { validations } from '../../../validators';
import { formElems as editForm, selectorNames } from './common';
import Select from '../../../components/Select/Select';

export default {
  components: {
    Select,
  },
  data: () => ({
    rules: {
      ...validations,
    },
    show: false,
    item: editForm(),
    selectorNames,
    autoCompleteOptions: [],
    autoCompleteFilterOptions: [],
  }),
  computed: {
    ...getters,
  },
  methods: {
    ...actions,
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
