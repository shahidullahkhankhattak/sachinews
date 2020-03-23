<template>
  <q-no-ssr>
    <q-layout view="hHh LpR fFf">
      <q-page-container>
        <transition name="slide-fade" mode="out-in" appear>
          <router-view />
        </transition>
      </q-page-container>
    </q-layout>
  </q-no-ssr>
</template>

<script>
export default {
  name: 'Login',
};
</script>
