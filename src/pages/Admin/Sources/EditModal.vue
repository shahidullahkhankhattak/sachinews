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
          <div class="row">
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-input
                v-model="item.name"
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                outlined
                label="Name"
              >
                <template v-slot:prepend>
                  <q-icon name="home" color="blue-4" />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-input
                v-model="item.url"
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                outlined
                label="Url"
              >
                <template v-slot:prepend>
                  <q-icon name="link" color="blue-4" />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 q-pt-xs q-pr-xs">
              <q-select
                v-model="item.lang"
                bg-color="white"
                color="blue-4"
                label-color="blue-4"
                outlined
                label="Language"
                value="english"
                :options="['english', 'urdu']"
              >
                <template v-slot:prepend>
                  <q-icon name="language" color="blue-4" />
                </template>
              </q-select>
            </div>
            <div class="col-md-12 q-pt-md">
              <q-btn color="white" text-color="blue-8">Submit</q-btn>
              <q-btn class="q-ml-md" @click="toggleDialog()" outline
                >Cancel</q-btn
              >
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>
<script>
import { extend } from 'quasar';

export default {
  data: () => ({
    show: false,
    item: {},
  }),
  methods: {
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
