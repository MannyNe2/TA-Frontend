<template>
  <q-card flat bordered class="q-px-lg q-py-xl" style="width: 400px">
    <div>
      <h5 class="q-my-none">Almost done...</h5>
      <h6 class="q-my-none text-caption text-grey-7">
        Tell us a little about yourself so we can finish booking your ticket
      </h6>
    </div>
    <q-form @submit.prevent="toConfirm">
      <div class="q-py-lg">
        <div class="q-gutter-sm">
          <q-input
            type="text"
            dense
            outlined
            v-model="firstName"
            label="First Name"
            :rules="[required('First Name'), name('First Name')]"
          />
          <q-input
            type="text"
            dense
            outlined
            v-model="middleName"
            label="Middle Name"
            :rules="[required('Middle Name'), name('Middle Name')]"
          />
          <q-input
            type="text"
            dense
            outlined
            v-model="lastName"
            label="Last Name"
            :rules="[required('Last Name'), name('Last Name')]"
          />
          <q-input
            type="text"
            dense
            outlined
            v-model="phone"
            label="Phone Number"
            :rules="[required('Phone Number'), ethPhone]"
          />
        </div>
      </div>
      <div class="flex flex-center">
        <q-btn
          type="submit"
          label="Continue"
          color="primary"
          size="lg"
          unelevated
          class="text-capitalize text-body2 rounded-borders"
          padding="md xl"
        />
      </div>
    </q-form>
  </q-card>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useIdentityStore } from 'src/stores/identity';
import { useCheckoutStore } from 'src/stores/checkout';
import { ethPhone, name, required } from 'src/utils/validation-rules/general';

const router = useRouter();

const identityStore = useIdentityStore();
const isLoggedIn = computed(() => !!identityStore.token);
const checkoutStore = useCheckoutStore();

const firstName = isLoggedIn.value
  ? ref(identityStore.profile.firstName.toString())
  : ref();
const middleName = isLoggedIn.value
  ? ref(identityStore.profile.middleName.toString())
  : ref();
const lastName = isLoggedIn.value
  ? ref(identityStore.profile.lastName.toString())
  : ref();
const phone = ref();

function toConfirm() {
  checkoutStore.setFirstName(firstName.value);
  checkoutStore.setMiddleName(middleName.value);
  checkoutStore.setLastName(lastName.value);
  checkoutStore.setPhone(phone.value);
  router.push({ name: 'book-confirm' });
}
</script>
