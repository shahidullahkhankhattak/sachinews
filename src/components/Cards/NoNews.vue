<template>
  <div class="col-xs-12">
    <q-card class="news-card text-center" flat bordered>
      <q-card-section :horizontal="$q.screen.gt.xs" :vertical="$q.screen.lt.xs">
        <q-card-section class="q-pt-xs col-12">
          <div class="text-overline">{{ $t('We\'re sorry') }}</div>
          <div class="text-caption text-grey-8 q-mt-sm">
            <img src="~assets/sad.svg" style="width:30vw;max-width:150px;" />
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ $t('No News Found Here') }}
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {};
</script>
