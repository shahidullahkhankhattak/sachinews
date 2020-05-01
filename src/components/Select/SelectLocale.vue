<template>
  <div>
    <q-select
      class="locale_select"
      map-options
      outlined
      behavior="menu"
      :value="locale && locale.iso"
      @input="setLocale"
      :options="languages.map(val => ({ label: val.name, value: val.iso }))"
      :dense="true"
      :options-dense="true"
    >
      <template v-slot:prepend>
        <q-icon name="g_translate" />
      </template>
    </q-select>
  </div>
</template>
<script>
import { getters } from './handleStore';
import { setLocale } from '../../config/configSetters';

export default {
  methods: {
    setLocale,
  },
  computed: {
    ...getters,
  },
};
</script>
