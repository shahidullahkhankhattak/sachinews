<template>
  <q-select
    outlined
    :label="label"
    :value="currentValue"
    lazy-rules
    :option-value="opt => getValue(optionValue, opt)"
    :option-label="opt => getValue(optionLabel, opt)"
    :rules="rules"
    :options="selectOptions"
    :disable="disabled"
    :color="color"
    :bg-color="bgColor"
    :use-input="useInput"
    :hide-selected="hideSelected"
    :input-debounce="0"
    :fill-input="fillInput"
    v-on="vOn()"
    :label-color="labelColor"
    :dense="dense"
    :options-dense="optionsDense"
    :class="classname"
    :behavior="behavior"
  >
    <template v-slot:option="scope">
      <q-expansion-item
        expand-separator
        :default-opened="hasChild(scope)"
        header-class="text-weight-bold"
        :label="scope.opt.label"
      >
        <template v-for="child in scope.opt.children">
          <q-item
            :key="child[optionValue]"
            clickable
            v-ripple
            v-close-popup
            @click="
              $emit('input', child[optionValue]);
              currentValue = child;
            "
            :class="{ 'bg-light-blue-1': value === child[optionValue] }"
          >
            <q-item-section>
              <q-item-label
                v-html="child[optionLabel]"
                class="q-ml-md"
              ></q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-expansion-item>
    </template>
    <template v-slot:prepend>
      <q-icon :name="icon" :color="iconColor" />
    </template>
  </q-select>
</template>
<script>
export default {
  props: [
    'value',
    'options',
    'icon',
    'label',
    'emptyMsg',
    'rules',
    'nullOption',
    'disabled',
    'color',
    'bgColor',
    'useInput',
    'hideSelected',
    'fillInput',
    'inputValue',
    'filter',
    'labelColor',
    'dense',
    'optionsDense',
    'classname',
    'behavior',
    'iconColor',
    'optionValue',
    'optionLabel',
  ],
  data: () => ({
    currentValue: '',
  }),
  computed: {
    selectOptions() {
      const valueKey = this.optionLabel;
      const options = typeof this.options === 'object'
        && [...this.options].sort(
          (a, b) => (this.getValue(valueKey, a) > this.getValue(valueKey, b) && 1) || -1,
        );
      const nullOptionArray = [];
      if (this.nullOption) {
        const nullOption = {};
        nullOption[this.optionLabel] = this.nullOption;
        nullOption[this.optionValue] = null;
        nullOptionArray.push(nullOption);
      }
      return (
        (options && [...nullOptionArray, ...options]) || [
          { value: '', name: this.emptyMsg },
        ]
      );
    },
  },
  methods: {
    hasChild(scope) {
      return scope.opt.children.some((c) => c[this.optionValue] === this.value);
    },
    getValue: (valueKey, object) => {
      if (valueKey) return object[valueKey];
      return object;
    },
    vOn() {
      const handlers = {};
      if (this.inputValue) {
        handlers['input-value'] = this.inputValue;
      }
      if (this.filter) {
        handlers.filter = this.filter;
      }
      return handlers;
    },
  },
};
</script>
