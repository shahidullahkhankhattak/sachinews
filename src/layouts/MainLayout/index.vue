<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">

    <app-header />

    <sidebar />

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
};
</script>
