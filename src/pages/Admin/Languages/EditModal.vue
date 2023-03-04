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
        <div class="text-h6">Edit Language</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="update({ item, toggleDialog })">
          <div class="row">
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-input
                v-model="item.name"
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                outlined
                label="Name"
                :rules="[rules.REQUIRED]"
              >
                <template v-slot:prepend>
                  <q-icon name="home" color="blue-4" />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-input
                v-model="item.iso"
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                outlined
                label="Iso"
                :rules="[rules.REQUIRED]"
              >
                <template v-slot:prepend>
                  <q-icon name="translate" color="blue-4" />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <Select
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                v-model="item.direction"
                label="Direction"
                value="rtl"
                :rules="[rules.REQUIRED]"
                :options="['ltr', 'rtl']"
                icon="swap_horizontal_circle"
                icon-color="blue-4"
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
import { actions } from './handleStore';
import { validations } from '../../../validators';
import { formElems as editForm } from './common';
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
