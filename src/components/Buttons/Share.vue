<template>
  <span class="relative-position q-mx-sm">
    <!-- <q-badge floating>5</q-badge> -->
    <q-btn-dropdown
      class="no-caret round"
      flat
      rounded
      color="primary"
      icon="share"
    >
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label><i class="fab fa-facebook-f q-mr-sm"></i>Instagram</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Facebook</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Google</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </span>
</template>
<script>
export default {};
</script>
