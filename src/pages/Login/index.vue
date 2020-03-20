<template>
  <q-page
    class="bg-grey-2 window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <q-card rounded bordered class="q-pa-lg shadow-1">
          <q-card-section class="q-pt-xs">
            <div class="text-overline text-red">Addictive Bulletin</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Login</div>
            <div class="text-caption text-grey">
              Please Login Below
            </div>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <q-img
              height="150px"
              width="150px"
              class="rounded-borders"
              src="/statics/login-avatar.png"
            />
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                color="red-4"
                outlined
                clearable
                v-model="email"
                type="email"
                label="email"
              >
                <template v-slot:append>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                color="red-4"
                outlined
                clearable
                v-model="password"
                type="password"
                label="password"
              >
                <template v-slot:append>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="red-4"
              size="lg"
              class="full-width"
              label="Login"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
