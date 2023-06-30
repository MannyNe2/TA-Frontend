<template>
  <div>
    <h4 class="q-mt-lg q-mb-lg text-weight-light text-primary">
      Tell us where you want to go!
    </h4>
    <q-form class="q-gutter-xs" @submit.prevent="onSubmit" greedy>
      <q-input
        outlined
        v-model="origin"
        label="Origin"
        type="city-full"
        :rules="bookingOriginRules"
      >
        <template v-slot:prepend>
          <q-icon left size="xs" name="ti-location-pin" />
        </template>
      </q-input>
      <q-input
        outlined
        v-model="destination"
        label="Destination"
        type="city-full"
        :rules="bookingDestinationRules"
      >
        <template v-slot:prepend>
          <q-icon left size="xs" name="ti-location-arrow" />
        </template>
      </q-input>
      <div class="row q-gutter-xs q-mt-none">
        <div class="col q-ml-none">
          <q-input
            outlined
            v-model="date"
            label="Date"
            stack-label
            type="date"
            :rules="bookingDateRules"
          />
        </div>
        <div class="col">
          <q-input
            outlined
            v-model="returnDate"
            label="Return Date (Optional)"
            stack-label
            :disable="!date"
            type="date"
            :rules="bookingReturnDateRules(date)"
          />
        </div>
      </div>
      <q-input
        outlined
        v-model="passengers"
        label="Passengers"
        type="number"
        :rules="bookingPassengersRules"
      >
        <template v-slot:prepend>
          <q-icon left size="xs" name="ti-user" />
        </template>
      </q-input>
      <div class="row justify-end q-py-lg">
        <q-btn
          :loading="btnLoading"
          label="Search"
          type="submit"
          color="primary"
          size="lg"
          unelevated
          class="text-capitalize text-body2 rounded-borders"
          padding="md xl"
        />
      </div>
    </q-form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useTicketSearchStore } from 'src/stores/ticket-search';
import { useRouter } from 'vue-router';
import {
  bookingOriginRules,
  bookingDestinationRules,
  bookingDateRules,
  bookingReturnDateRules,
  bookingPassengersRules,
} from 'src/utils/validation-rules/booking';

const store = useTicketSearchStore();
const router = useRouter();

const origin = ref(null);
const destination = ref(null);
const date = ref(null);
const returnDate = ref(null);
const passengers = ref(1);
const btnLoading = ref(false);

async function onSubmit() {
  btnLoading.value = true;
  store.setOrigin(origin.value);
  store.setDestination(destination.value);
  store.setDate(date.value);
  store.setReturnDate(returnDate.value);
  store.setPassengers(parseInt(passengers.value));
  // router.push({ name: 'root-search' });
  const dataQuery = {
    origin: origin.value,
    destination: destination.value,
    date: date.value,
  };
  const x = await store.search(dataQuery);
  console.log(x);
  btnLoading.value = false;
  router.push('/search');
}
</script>
