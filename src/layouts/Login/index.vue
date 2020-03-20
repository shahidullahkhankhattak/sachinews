<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container>
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
    </q-page-container>

  </q-layout>
</template>

<script>

export default {
  name: 'Login',
};
</script>
