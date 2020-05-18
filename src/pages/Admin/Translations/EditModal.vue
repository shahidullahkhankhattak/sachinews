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
        <div class="text-h6">Edit Translation</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="update({ item, toggleDialog})">
          <div class="row">
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-select
                :value="item.lang"
                @input="(val) => item.lang = val.value"
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                outlined
                label="Language"
                map-options
                :options="languages.map(lang => ({ label: lang.name, value: lang.iso}))"
                :rules="[rules.REQUIRED]"
              >
                <template v-slot:prepend>
                  <q-icon name="language" color="blue-4" />
                </template>
              </q-select>
            </div>
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-input
                v-model="item.engText"
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                outlined
                label="English Text"
                :rules="[rules.REQUIRED]"
              >
                <template v-slot:prepend>
                  <q-icon name="create" color="blue-4" />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-input
                v-model="item.langText"
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                outlined
                label="Translation Text"
                :rules="[rules.REQUIRED]"
              >
                <template v-slot:prepend>
                  <q-icon name="translate" color="blue-4" />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 q-pt-md">
              <q-btn type="submit" color="white" text-color="blue-8">Submit</q-btn>
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
import { formElems as editForm } from './common';

export default {
  data: () => ({
    rules: {
      ...validations,
    },
    show: false,
    item: editForm(),
  }),
  computed: {
    ...getters,
  },
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
