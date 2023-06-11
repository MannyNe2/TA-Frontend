<template>
  <q-card flat class="bg-transparent">
    <q-form @submit="onSubmit" class="q-gutter-xs">
      <q-card-section>
        <h4 class="q-mb-none text-weight-light text-center text-primary">
          Hey there,
        </h4>
        <h6 class="q-my-none text-weight-light text-center text-grey-7">
          Tell us a bit about yourself!
        </h6>
      </q-card-section>
      <q-card-section>
        <q-input
          dense
          outlined
          v-model="firstName"
          label="First name"
          :rules="[
            (val) => !!val || 'First name is required',
            (val) =>
              val.length <= 50 || 'First name can not be over 50 characters',
          ]"
        >
          <template v-slot:prepend>
            <q-icon size="xs" name="fa-solid fa-user" left />
          </template>
        </q-input>
        <q-input
          dense
          outlined
          v-model="middleName"
          label="Middle name"
          :rules="[
            (val) => !!val || 'Middle name is required',
            (val) =>
              val.length <= 50 || 'Middle name can not be over 50 characters',
          ]"
        >
          <template v-slot:prepend>
            <q-icon size="xs" name="fa-solid fa-user-group" left />
          </template>
        </q-input>
        <q-input
          dense
          outlined
          v-model="lastName"
          label="Last name"
          :rules="[
            (val) => !!val || 'Last name is required',
            (val) =>
              val.length <= 50 || 'Last name can not be over 50 characters',
          ]"
        >
          <template v-slot:prepend>
            <q-icon size="xs" name="fa-solid fa-users" left />
          </template>
        </q-input>
        <q-input
          dense
          outlined
          v-model="phone"
          label="Phone"
          :rules="[
            (val) => !!val || 'Phone number is required',
            (val) =>
              val.length <= 15 || 'Phone number can not be over 15 characters',
          ]"
        >
          <template v-slot:prepend>
            <q-icon size="xs" name="fa-solid fa-phone" left />
          </template>
        </q-input>
        <q-input
          dense
          outlined
          v-model="email"
          label="Email address"
          :rules="[
            (val) => {
              if (val) {
                return (
                  new RegExp(emailRegex).test(val) || 'Email address not valid'
                );
              } else {
                return true;
              }
            },
          ]"
        >
          <template v-slot:prepend>
            <q-icon size="xs" name="fa-solid fa-at" left />
          </template>
        </q-input>
        <q-input
          dense
          outlined
          v-model="password"
          label="Password"
          type="password"
        >
          <template v-slot:prepend>
            <q-icon size="xs" name="fa-solid fa-key" left />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="row justify-center q-pt-lg">
        <q-btn
          type="submit"
          label="Create Account"
          color="primary"
          size="lg"
          unelevated
          class="text-capitalize text-body2 rounded-borders q-mb-sm full-width"
          padding="md md"
        />
        <q-btn
          @click="selectGoogle"
          label="Sign up with Google"
          unelevated
          outline
          icon="fab fa-google fa-3x"
          class="text-capitalize outline text-body2 rounded-borders q-mb-sm full-width"
          padding="md md"
        />
      </q-card-section>
      <q-card-section>
        <h6 class="text-center q-mb-sm text-subtitle2 text-weight-light">
          Already have an account?
        </h6>
        <div class="row justify-center">
          <q-btn
            outline
            label="Login now"
            color="primary"
            padding="sm lg"
            class="text-capitalize text-body2 rounded-borders"
            @click="selectLogin"
          />
        </div>
      </q-card-section>
    </q-form>
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
import { emailRegex } from 'src/utils/constants/email_regex';
import { useIdentityStore } from 'src/stores/identity';

export default defineComponent({
  name: 'SignUpCard',
  emits: ['select-login'],
  setup(_, ctx) {
    const firstName = ref(null);
    const middleName = ref(null);
    const lastName = ref(null);
    const phone = ref(null);
    const email = ref(null);
    const password = ref(null);

    const store = useIdentityStore();

    function selectLogin() {
      ctx.emit('select-login');
    }
    async function onSubmit() {
      const user = {
        firstName: firstName.value,
        middleName: middleName.value,
        lastName: lastName.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
      };
      try {
        await store.signup(user).then((data) => {
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
    async function selectGoogle() {
      try {
        await store.signupGoogle().then((data) => {
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

    return {
      firstName,
      middleName,
      lastName,
      phone,
      email,
      password,
      selectLogin,
      selectGoogle,
      onSubmit,
    };
  },
});
</script>
