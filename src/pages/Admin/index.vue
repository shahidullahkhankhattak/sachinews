<template>
  <q-page>
    <div class="p-pa-md main-container">
      <div class="row">
        <div class="col-12">
          <div class="q-pa-md">
            <q-breadcrumbs class="text-primary" active-color="purple">
              <template v-slot:separator>
                <q-icon size="1.2em" name="arrow_forward" color="purple" />
              </template>
              <q-breadcrumbs-el to="/admin" label="Home" icon="home" />
            </q-breadcrumbs>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="q-pa-md">
            <q-card class="my-card">
              <q-card-section class="bg-primary text-white">
                <div class="text-h6">Sources</div>
                <div class="text-subtitle2">3 sources added</div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="left">
                <q-btn color="primary" outline to="/admin/sources"
                  >View / Add Sources</q-btn
                >
              </q-card-actions>
            </q-card>
          </div>
        </div>
        <div class="col-md-3">
          <div class="q-pa-md">
            <q-card class="my-card">
              <q-card-section class="bg-green-8 text-white">
                <div class="text-h6">Categories</div>
                <div class="text-subtitle2">2 Categories Added</div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="left">
                <q-btn color="green-8" outline to="/admin/categories"
                  >View / Add Categories</q-btn
                >
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {};
</script>
