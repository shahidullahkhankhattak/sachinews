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
        <q-form @submit="update({ item, toggleDialog})">
          <div class="row">
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-input
                v-model="item.url"
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                outlined
                label="Link"
                :rules="[rules.REQUIRED, rules.URL]"
              >
                <template v-slot:prepend>
                  <q-icon name="home" color="blue-4" />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-select
                v-model="item.category"
                bg-color="white"
                color="blue-4"
                outlined
                label="Category"
                lazy-rules
                :option-value="opt => opt._id"
                :option-label="opt => opt.name"
                :rules="[rules.REQUIRED]"
                :options="categories"
                map-options
                emit-value
              >
                <template v-slot:prepend>
                  <q-icon name="class" />
                </template>
              </q-select>
            </div>
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-select
                v-model="item.country"
                bg-color="white"
                color="blue-4"
                outlined
                label="Country"
                lazy-rules
                :option-value="opt => opt._id"
                :option-label="opt => opt.name"
                :rules="[]"
                :options="[{_id: null, name: 'N/A'},...countries]"
                map-options
                emit-value
              >
                <template v-slot:prepend>
                  <q-icon name="room" />
                </template>
              </q-select>
            </div>
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-select
                v-model="item.encoding"
                bg-color="white"
                color="blue-4"
                outlined
                label="Encoding"
                lazy-rules
                :rules="[rules.REQUIRED]"
                :options="['xml', 'html']"
                map-options
              >
                <template v-slot:prepend>
                  <q-icon name="code" />
                </template>
              </q-select>
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
