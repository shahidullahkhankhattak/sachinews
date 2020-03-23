<template>
  <q-page
    class="bg-grey-2 window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <q-card rounded bordered class="q-pa-lg shadow-1">
          <q-card-section class="q-pt-xs">
            <div class="text-overline">
              <span class="text-red">Addictive</span> Bulletin
            </div>
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
            <transition-group name="slide-fade" mode="out-in">
              <q-banner class="text-white bg-red" v-for="({ msg }) in errors" :key="msg">
                {{msg}}
              </q-banner>
            </transition-group>
          </q-card-section>
          <q-form @submit="handleSubmit(form)">
            <q-card-section class="q-gutter-md">
              <q-input
                color="green-4"
                outlined
                v-model="form.email"
                type="email"
                label="email"
                lazy-rules
                :rules="[val => val.length || 'Please enter your email']"
              >
                <template v-slot:append>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                color="green-4"
                outlined
                v-model="form.password"
                type="password"
                label="password"
                :rules="[val => val.length || 'Please enter your password']"
              >
                <template v-slot:append>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
                type="submit"
                unelevated
                color="green-4"
                size="lg"
                class="full-width"
                label="Login"
              />
            </q-card-actions>
          </q-form>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { actions, getters } from './handleStore';

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    ...getters,
  },
  methods: {
    ...actions,
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
