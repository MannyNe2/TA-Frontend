<template>
  <q-card class="q-pa-lg" style="width: 400px">
    <!-- TODO: Add error page if ticket unavailable -->
    <q-carousel
      v-model="slide"
      animated
      transition-next="jump-left"
      transition-prev="jump-right"
      style="height: auto"
    >
      <q-carousel-slide :name="slides[0]">
        <div v-if="paymentLoading">
          <h5 class="q-my-none text-center">Processing...</h5>
          <p class="text-center text-subtitle1 text-grey-7">
            Please wait while we process your payment
          </p>
          <div class="q-py-md row justify-center">
            <q-circular-progress color="primary" indeterminate size="xl" />
          </div>
        </div>
        <span v-else>
          <div v-if="paymentSuccess">
            <div class="row justify-center">
              <q-icon name="fa-solid fa-check-circle" color="green" size="xl" />
            </div>
            <p class="text-center q-pt-md text-subtitle2">Payment Successful</p>
            <q-separator class="q-my-lg" />
            <p class="text-center">Your spot has been booked!</p>
            <p class="text-center text-grey-7">ID: {{ id }}</p>
            <q-img
              :src="imgg"
              id="QR"
              class="rounded-borders"
              style="width: 100%"
            />
          </div>
          <div v-else>
            <div class="row justify-center">
              <q-icon name="fa-solid fa-circle-xmark" color="red" size="xl" />
            </div>
            <p class="text-center q-pt-md text-subtitle2">Payment Failed</p>
            <q-separator class="q-my-lg" />
            <p class="text-center">We were unable to process your payment.</p>
            <p class="text-center">Please try again later.</p>
            <p class="text-center text-grey-7">
              ERROR: ERR-{{ faker.datatype.number({ min: 100, max: 500 }) }}
            </p>
            <q-btn
              unelevated
              outline
              color="primary"
              size="md"
              icon="fa-solid fa-rotate-right"
              class="full-width text-capitalize rounded-borders"
              label="Retry"
              padding="md"
              @click="retry"
            />
          </div>
          <q-btn
            unelevated
            color="primary"
            icon="home"
            class="full-width text-capitalize rounded-borders q-my-md"
            label="Go back home"
            padding="md"
            to="/"
          />
        </span>
      </q-carousel-slide>
    </q-carousel>
  </q-card>
</template>
<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { useIdentityStore } from 'src/stores/identity';
import { useCheckoutStore } from 'src/stores/checkout';
import { faker } from '@faker-js/faker';
import { useRoute } from 'vue-router';
import fetch from 'cross-fetch';
import { hindekeClient } from 'src/config/apollo';
import gql from 'graphql-tag';
import ticketConfirm from 'src/queries/ticketConfirm.gql';
import { provideApolloClient, useQuery } from '@vue/apollo-composable';
import qr from 'qrcode';

const slides = ref(['confirm', 'checkout']);
const slide = ref(slides.value[0]);

const route = useRoute();
const id = route.params.id;

const checkoutStore = useCheckoutStore();

const paymentLoading = ref(true);
const paymentSuccess = ref(null);
const variables = ref({
  id: id,
});
const imgg = ref(null);

// TODO: DO NOT UNDER ANY CIRCUMSTANCES KEEP THIS OUTSIDE OF DEMO PURPOSES
// const price = route.query.price;
const parsedPrice = parseInt(checkoutStore.result.price);
const price = parsedPrice === NaN ? 0 : parsedPrice;
const resulting = ref(null);

onMounted(() => {
  checkout();
});

const { result, loading, error } = provideApolloClient(hindekeClient)(() =>
  useQuery(
    gql`
      query ticketConfirm($id: uuid = "") {
        transaction_by_pk(id: $id) {
          id
          status
        }
      }
    `,
    variables
  )
);

console.log(result);

watch(
  result,
  (data) => {
    setTimeout(() => (paymentLoading.value = false), 7000);
    console.log('New message received:', data.transaction_by_pk.status);
    resulting.value = data.transaction_by_pk.status;
    if (resulting.value === 'CLOSED') {
      qr.toDataURL(data.transaction_by_pk.id, (err, url) => {
        if (err) throw err;
        imgg.value = url;
      });
    }
    checkout();
  },
  {
    lazy: true, // Don't immediately execute handler
  }
);

async function checkout() {
  paymentSuccess.value = resulting.value === 'CLOSED' ? true : false;
}

function retry() {
  paymentSuccess.value = null;
  checkout();
}
</script>
