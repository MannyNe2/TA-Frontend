<template>
  <q-card flat bordered class="q-pa-lg q-gutter-y-sm">
    <h6 class="q-my-none text-primary text-weight-regular">Filter</h6>
    <q-input
      dense
      v-model="origin"
      label="Origin"
      outlined
      :rules="bookingOriginRules"
    >
      <template v-slot:prepend>
        <q-icon left size="xs" name="ti-location-pin" />
      </template>
    </q-input>
    <q-input
      dense
      v-model="destination"
      label="Destination"
      outlined
      :rules="bookingDestinationRules"
    >
      <template v-slot:prepend>
        <q-icon left size="xs" name="ti-location-arrow" />
      </template>
    </q-input>
    <q-input
      dense
      v-model="date"
      label="Date"
      stack-label
      outlined
      type="date"
      :rules="bookingDateRules"
    />
    <q-input
      dense
      v-model="returnDate"
      label="Return Date"
      stack-label
      outlined
      :disable="!date"
      type="date"
      :rules="bookingReturnDateRules(date)"
    />
    <q-input
      dense
      v-model="passengers"
      label="Passengers"
      outlined
      type="number"
      :rules="bookingPassengersRules"
    >
      <template v-slot:prepend>
        <q-icon left size="xs" name="ti-user" />
      </template>
    </q-input>
  </q-card>
</template>
<script>
export default {
  name: 'SearchResultsFilter',
};
</script>
<script setup>
import { useTicketSearchStore } from 'src/stores/ticket-search';
import { computed } from 'vue';
import {
  bookingOriginRules,
  bookingDestinationRules,
  bookingDateRules,
  bookingReturnDateRules,
  bookingPassengersRules,
} from 'src/utils/validation-rules/booking';

const store = useTicketSearchStore();

const origin = computed({
  get: () => store.$state.origin,
  set: (value) => store.setOrigin(value),
});
const destination = computed({
  get: () => store.$state.destination,
  set: (value) => store.setDestination(value),
});
const date = computed({
  get: () => store.$state.date,
  set: (value) => store.setDate(value),
});
const returnDate = computed({
  get: () => store.$state.returnDate,
  set: (value) => store.setReturnDate(value),
});
const passengers = computed({
  get: () => store.$state.passengers,
  set: (value) => store.setPassengers(value),
});
</script>
