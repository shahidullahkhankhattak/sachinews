<template>
  <div>
    <Select
      classname="locale_select"
      behavior="menu"
      :value="locale && locale.iso"
      @input="setLocale"
      option-label="name"
      option-value="iso"
      :options="languages"
      :dense="true"
      :options-dense="true"
      icon="g_translate"
    />
  </div>
</template>
<script>
import { getters } from './handleStore';
import { setLocale } from '../../config/configSetters';
import Select from './Select';

export default {
  components: {
    Select,
  },
  methods: {
    setLocale,
  },
  computed: {
    ...getters,
  },
};
</script>
