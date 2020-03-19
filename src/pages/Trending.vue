<template>
  <q-page class="flex flex-center">
    <h1>Trending</h1>
  </q-page>
</template>

<script>
import { config } from '../config';

const { app: { logo } } = config;
export default {
  data: () => ({
    logo,
  }),
  name: 'PageIndex',
};
</script>
