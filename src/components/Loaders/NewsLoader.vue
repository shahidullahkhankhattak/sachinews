<template>
  <q-card class="news-card" flat bordered>
    <q-card-section :horizontal="$q.screen.gt.xs" :vertical="$q.screen.lt.xs">
      <q-card-section class="q-pt-xs col-8">
        <q-skeleton width="40%" type="text" />
        <q-skeleton animation="blink" class="text-h5 q-mt-sm q-mb-xs" />
        <q-skeleton animation="fade" width="100px" type="text" />
        <q-skeleton class="q-mt-md" type="text" />
        <q-skeleton type="text" />
      </q-card-section>

      <q-card-section class="col-4 flex flex-right">
        <q-skeleton animation="blink" type="rect" height="150px" width="100%" />
      </q-card-section>
    </q-card-section>

    <q-card-actions>
      <q-skeleton
        class="q-mx-sm q-mb-sm"
        type="QBtn"
        width="35px"
        height="30px"
      />
      <q-skeleton
        class="q-mx-sm q-mb-sm"
        type="QBtn"
        width="35px"
        height="30px"
      />
      <q-skeleton
        class="q-mx-sm q-mb-sm"
        type="QBtn"
        width="35px"
        height="30px"
      />
    </q-card-actions>
  </q-card>
</template>
<script>
export default {};
</script>
