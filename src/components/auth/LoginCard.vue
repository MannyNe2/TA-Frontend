<template>
  <q-card flat class="bg-transparent">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-card-section>
        <h4 class="text-weight-light text-center text-primary">
          Welcome back!
        </h4>
      </q-card-section>
      <q-card-section>
        <!-- TODO: Inupt validation rules -->
        <q-input
          outlined
          v-model="email"
          label="Email, Phone, or Username"
          class="rounded-borders"
          :rules="[(val) => !!val || 'Email, phone, or username required']"
        >
          <template v-slot:prepend>
            <q-icon left size="xs" name="fa-solid fa-user" />
          </template>
        </q-input>
        <q-input
          outlined
          v-model="password"
          label="Password"
          type="password"
          class="rounded-borders"
          :rules="[(val) => !!val || 'Password required']"
        >
          <template v-slot:prepend>
            <q-icon left size="xs" name="fa-solid fa-key" />
          </template>
        </q-input>
        <div class="row justify-center">
          <div class="col-auto q-pr-sm">
            <q-checkbox
              v-model="stayLoggedIn"
              label="Remember me on this device"
              checked-icon="fa-solid fa-circle-check"
              unchecked-icon="fa-regular fa-circle"
              class="text-subtitle2 text-grey-7"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="row justify-center">
        <q-btn
          type="submit"
          label="Login"
          color="primary"
          size="lg"
          unelevated
          class="text-capitalize text-body2 rounded-borders q-mb-sm full-width"
          padding="md md"
        />
        <q-btn
          @click="selectGoogle"
          label="Log in with Google"
          unelevated
          outline
          icon="fab fa-google fa-3x"
          class="text-capitalize outline text-body2 rounded-borders q-mb-sm full-width"
          padding="md md"
        />
      </q-card-section>
    </q-form>
    <q-card-section>
      <h6 class="text-center q-mb-sm text-subtitle2 text-weight-light">
        New to Hindeke?
      </h6>
      <div class="row justify-center">
        <q-btn
          outline
          label="Sign up now"
          color="primary"
          padding="sm lg"
          class="text-capitalize text-body2 rounded-borders"
          @click="selectSignup"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
<style>
.fa-google {
  background: conic-gradient(
      from -45deg,
      #ea4335 110deg,
      #4285f4 90deg 180deg,
      #34a853 180deg 270deg,
      #fbbc05 270deg
    )
    73% 55%/150% 150% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
</style>
<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

import { useIdentityStore } from 'src/stores/identity';

export default defineComponent({
  name: 'LoginCard',
  emits: ['select-signup'],
  setup(_, ctx) {
    const router = useRouter();

    const email = ref(null);
    const password = ref(null);
    const stayLoggedIn = ref(false);

    const store = useIdentityStore();

    async function onSubmit() {
      try {
        await store.login(email.value, password.value).then((data) => {
          if (data) {
            Notify.create({
              message: data.message,
              type: 'negative',
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    function selectSignup() {
      ctx.emit('select-signup');
    }

    return {
      email,
      password,
      stayLoggedIn,
      onSubmit,
      selectSignup,
    };
  },
});
</script>
