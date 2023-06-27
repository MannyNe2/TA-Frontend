<template>
  <div class="q-gutter-y-md">
    <h6 class="q-my-none">Telebirr Checkout</h6>
    <!-- <q-separator /> -->
    <!-- TODO: Add actual instructions -->
    <p class="text-body1 text-weight-bold text-grey-7">Instructions</p>
    <ol class="q-my-none q-px-md">
      <li>Go to the Telebirr app</li>
      <li>Select 'Pay Merchant'</li>
      <li>
        Enter our merchant code ({{ merchantCode }} in the 'Merchant Code'
        field)
      </li>
      <li>Select 'Pay'</li>
      <li>Click the 'Confirm Payment' button below</li>
    </ol>

    <q-btn
      unelevated
      color="primary"
      icon="ti-check"
      class="full-width text-capitalize rounded-borders q-mt-xl"
      label="Confirm Payment"
      padding="md md"
      @click="confirmPayment"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

const merchantCode = ref(20054);

const emit = defineEmits(['paymentsuccess', 'paymenterror']);

function confirmPayment() {
  // TODO: Replace random success/failure with actual submission
  const rand = faker.datatype.boolean();
  emit(rand ? 'paymentsuccess' : 'paymenterror');
}
</script>
