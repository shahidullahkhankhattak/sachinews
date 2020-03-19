<template>
  <q-page class="flex flex-center">
  </q-page>
</template>

<script>
import { config } from '../config';

const { app: { logo } } = config;
export default {
  data: () => ({
    logo,
  }),
  name: 'HomePage',
};
</script>
