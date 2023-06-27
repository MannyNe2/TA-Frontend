<template>
  <q-form @submit="submit">
    <div class="q-pb-md">
      <q-select
        dense
        outlined
        v-model="selectedBank"
        :options="banks"
        label="Bank"
        :rules="[(val) => !!val || 'Please select a bank']"
      />
    </div>
    <div class="q-gutter-y-md">
      <q-input
        v-model="fullName"
        dense
        outlined
        label="Full Name"
        :rules="[(val) => !!val || 'Please enter your full name']"
      />
      <q-input
        v-model="transactionNumber"
        dense
        outlined
        label="Transaction Number"
        :rules="[(val) => !!val || 'Please enter a transaction number']"
      />
    </div>
    <q-btn
      unelevated
      color="primary"
      icon="ti-check"
      class="full-width text-capitalize rounded-borders q-mt-xl"
      label="Confirm Payment"
      padding="md md"
      type="submit"
    />
  </q-form>
</template>
<script setup>
import { faker } from '@faker-js/faker';
import { ref } from 'vue';

const emit = defineEmits(['paymentsuccess', 'paymenterror']);

const banks = ref([
  'Awash Bank',
  'Bank of Abyssinia',
  'Commercial Bank of Ethiopia',
  'Dashen Bank',
  'Enat Bank',
  'Hibret Bank',
]);

const selectedBank = ref();
const fullName = ref();
const transactionNumber = ref();

function submit() {
  // TODO: Replace random success/failure with actual submission
  const rand = faker.datatype.boolean();
  emit(rand ? 'paymentsuccess' : 'paymenterror');
}
</script>
