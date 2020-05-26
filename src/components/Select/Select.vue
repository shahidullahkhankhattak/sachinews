<template>
  <q-select
    outlined
    :label="label"
    :value="value"
    @input="value => $emit('input', value)"
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
    map-options
    emit-value
    :label-color="labelColor"
    :dense="dense"
    :options-dense="optionsDense"
    :class="classname"
    :behavior="behavior"
  >
    <template v-slot:prepend>
      <q-icon :name="icon" :color="iconColor"/>
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
    'optionValue',
    'optionLabel',
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
  ],
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
      return (options && [...nullOptionArray, ...options]) || [{ value: '', name: this.emptyMsg }];
    },
  },
  methods: {
    getValue: (valueKey, object) => {
      if (valueKey) return object[valueKey];
      return object;
    },
    vOn() {
      const handlers = {};
      if (this.inputValue) { handlers['input-value'] = this.inputValue; }
      if (this.filter) {
        handlers.filter = this.filter;
      }
      return handlers;
    },
  },
};
</script>
