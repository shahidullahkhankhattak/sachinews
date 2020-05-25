<template>
  <article class="col-xs-12 col-lg-8 q-pa-md">
    <q-skeleton
      animation="fade"
      type="rect"
      class="q-mb-sm article-media"
      height="40px"
      width="100px"
    />
    <q-skeleton
      animation="fade"
      type="rect"
      class="q-mb-sm article-media"
      height="450px"
    />
    <q-skeleton class="q-my-sm q-mt-md" height="40px" type="rect" />
    <q-skeleton height="40px" width="70%" type="rect" />
    <q-skeleton class="q-my-sm" width="30%" type="text" height="30px" />
    <div class="article-body">
      <q-skeleton type="text" animation="blink" height="30px"></q-skeleton>
      <q-skeleton type="text" animation="blink" height="30px"></q-skeleton>
      <q-skeleton type="text" animation="blink" height="30px"></q-skeleton>
      <q-skeleton type="text" animation="blink" height="30px"></q-skeleton>
      <q-skeleton type="text" animation="blink" height="30px"></q-skeleton>
      <q-skeleton type="text" animation="blink" height="30px"></q-skeleton>
      <q-skeleton type="text" animation="blink" height="30px"></q-skeleton>
      <q-skeleton type="text" animation="blink" height="30px"></q-skeleton>
      <div class="text-center">
        <q-skeleton
          type="text"
          animation="pulse-y"
          class="q-my-xs"
          height="20px"
        ></q-skeleton>
        <q-skeleton
          type="text"
          width="50%"
          animation="pulse"
          class="q-my-xs q-mx-auto"
          height="20px"
        ></q-skeleton>
        <q-skeleton
          type="text"
          width="80%"
          animation="pulse"
          class="q-my-xs q-mx-auto"
          height="20px"
        ></q-skeleton>
      </div>
      <q-skeleton type="text" animation="blink" height="30px"></q-skeleton>
      <q-skeleton type="text" animation="blink" height="30px"></q-skeleton>
      <q-skeleton type="text" animation="blink" height="30px"></q-skeleton>
      <q-skeleton type="text" animation="blink" height="30px"></q-skeleton>
    </div>
  </article>
</template>
<script>
export default {};
</script>
