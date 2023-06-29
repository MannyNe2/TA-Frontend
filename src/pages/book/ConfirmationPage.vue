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
        <div>
          <div class="row q-gutter-lg">
            <q-icon
              size="md"
              name="ti-shopping-cart"
              color="grey-7"
              class="q-pt-sm"
            />
            <div>
              <h5 class="q-my-none text-weight-bold">Confirm Booking</h5>
              <p class="text-subtitle2 text-grey-7 q-pt-xs">
                ID:
                <span class="text-weight-regular"> {{ id }} </span>
              </p>
            </div>
          </div>
        </div>
        <q-card flat class="bg-light-page q-pa-md q-my-lg">
          <q-list>
            <q-item dense class="q-pa-none q-pb-md items-start">
              <q-item-section>Name</q-item-section>
              <!-- <q-item-section class="row justify-center">
                  <q-icon class="amber" name="ti-more-alt" />
                </q-item-section> -->
              <q-item-section class="text-right">
                {{ fullName ?? '-' }}
              </q-item-section>
            </q-item>
            <q-item dense class="q-pa-none q-pb-md items-start">
              <q-item-section>Phone</q-item-section>
              <!-- <q-item-section class="row justify-center">
                  <q-icon class="amber" name="ti-more-alt" />
                </q-item-section> -->
              <q-item-section class="text-right">
                {{ phone ?? '-' }}
              </q-item-section>
            </q-item>
            <q-item dense class="q-pa-none q-pb-md items-start">
              <q-item-section>Origin</q-item-section>
              <!-- <q-item-section class="row justify-center">
                  <q-icon class="amber" name="ti-more-alt" />
                </q-item-section> -->
              <q-item-section class="text-right">
                {{ origin ?? '-' }}
              </q-item-section>
            </q-item>
            <q-item dense class="q-pa-none q-pb-md items-start">
              <q-item-section class="">Destination</q-item-section>
              <q-item-section class="text-right">
                {{ destination ?? '-' }}
              </q-item-section>
            </q-item>
            <q-item dense class="q-pa-none q-pb-md items-start">
              <q-item-section class="">Departure Date</q-item-section>
              <q-item-section class="text-right">
                {{ date ?? '-' }}
              </q-item-section>
            </q-item>
            <q-item dense class="q-pa-none q-pb-md items-start">
              <q-item-section class="">Distance</q-item-section>
              <q-item-section class="text-right">
                {{ distance }}
              </q-item-section>
            </q-item>
            <q-item dense class="q-pa-none q-pb-md items-start">
              <q-item-section class="">Round Trip</q-item-section>
              <q-item-section class="text-right">
                {{ returnDate ? 'Yes' : 'No' }}
              </q-item-section>
            </q-item>
            <q-separator class="q-mb-md" />
            <q-item
              dense
              class="q-pa-none q-pb-md items-start text-subtitle1 text-weight-bold text-grey-8"
            >
              <q-item-section> Sub total </q-item-section>
              <q-item-section class="text-right">
                {{ formatPrice(price) }} Br
              </q-item-section>
            </q-item>
            <q-item dense class="q-pa-none q-pb-md items-start">
              <q-item-section class="">Passengers</q-item-section>
              <q-item-section class="text-right">
                x{{ passengers }}
              </q-item-section>
            </q-item>
            <q-separator class="q-mb-md" />
            <q-item dense class="q-pa-none items-start text-h6">
              <q-item-section class="text-weight-regular">Total</q-item-section>
              <q-item-section class="text-right text-weight-bold">
                {{ formatPrice(price * passengers) }} Br
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
        <div class="q-gutter-y-md q-pt-lg">
          <q-btn
            unelevated
            type="submit"
            color="primary"
            icon="ti-bag"
            class="full-width text-capitalize rounded-borders"
            label="Checkout"
            padding="md"
            @click="checkout"
          />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="slides[1]">
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
            <p class="text-center text-grey-7">
              ID: {{ faker.datatype.uuid() }}
            </p>
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
import { computed, ref } from 'vue';
import { useTicketSearchStore } from 'src/stores/ticket-search';
import { useOldCheckoutStore } from 'src/stores/old-checkout';
import { useCheckoutStore } from 'src/stores/checkout';
import { useIdentityStore } from 'src/stores/identity';
import { faker } from '@faker-js/faker';
import { useRoute } from 'vue-router';
import { formatPrice } from 'src/utils/money';
import { fakeUserInfoEndpoint } from 'src/services/fake-auth';
import fetch from 'cross-fetch';
import { hindekeClient } from 'src/config/apollo';
import addTransaction from 'src/queries/addTransaction.gql';

const slides = ref(['confirm', 'checkout']);
const slide = ref(slides.value[0]);

const route = useRoute();
const id = route.params.id;

// TODO: Fetch these from the backend. Faking it using stores, faker, and params for now
const acceptableUnits = ['km', 'm'];

const ticketStore = useTicketSearchStore();
const checkoutStore = useCheckoutStore();
const identityStore = useIdentityStore();
// const origin = computed(() => ticketStore.$state.origin);
// const destination = computed(() => ticketStore.$state.destination);
// const date = computed(() => ticketStore.$state.date);
// const returnDate = computed(() => ticketStore.$state.returnDate);
// const passengers = computed(() => ticketStore.$state.passengers);

const fullName = computed(() => checkoutStore.getFullName);
const phone = computed(() => checkoutStore.getPhone);
const origin = computed(() => checkoutStore.result.origin);
const destination = computed(() => checkoutStore.result.destination);
const date = computed(() => new Date(checkoutStore.result.leave_date));
const returnDate = computed(() => checkoutStore.result.returnDate);
const passengers = computed(() => checkoutStore.result.passengers ?? 1);
const distance =
  faker.datatype.number(15, 300) +
  ' ' +
  acceptableUnits[faker.datatype.number(0, 1)];

const paymentLoading = ref(false);
const paymentSuccess = ref(null);

// TODO: DO NOT UNDER ANY CIRCUMSTANCES KEEP THIS OUTSIDE OF DEMO PURPOSES
// const price = route.query.price;
const parsedPrice = parseInt(checkoutStore.result.price);
const price = parsedPrice === NaN ? 0 : parsedPrice;

// Using stores to maybe simplify the checkout process
// const billedPrice = computed({
//   get: () => oldCheckoutStore.$state.billedPrice,
//   set: (value) => oldCheckoutStore.setBilledPrice(value),
// });

// function reset() {
//   paymentMode.value = billedPrice.value = null;
//   slide.value = slides.value[0];
// }

async function checkout() {
  // billedPrice.value = price.value;
  paymentLoading.value = true;
  paymentSuccess.value = faker.datatype.boolean();
  // make it false here
  setTimeout(() => (paymentLoading.value = false), 20000);
  slide.value = slides.value[1];

  /* try {
    const ddd = await fetch(
      'https://amannnegussie2.npkn.net/payment',
      {
        ticket_id: id,
        first_name: checkoutStore.getFirstName,
        last_name: checkoutStore.getLastName,
        phone: checkoutStore.getPhone,
        currency: 'ETB',
        amount: 200,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(ddd);
  } catch (error) {
    console.log(error);
  } */

  /*   try {
    const res = await hindekeClient
      .mutate({
        mutation: addTransaction,
        variables: {
          amount: price,
          ticket_id: id,
          user: identityStore.profile.userId,
        },
      })
      .then(({ data }) => data && data.insert_transaction_one);
    if (res) {
      console.log(res);
    }
    //router.push('/home');
  } catch (error) {
    console.log(error);
  } */

  const makeGraphQLClient =
    ({ url, headers }) =>
    async ({ query }) => {
      console.log(JSON.stringify({ ...query }));
      const request = await fetch(url, {
        headers,
        method: 'POST',
        body: JSON.stringify({ ...query }),
      });
      return request.json();
    };

  const sendQuery = makeGraphQLClient({
    url: 'https://amannnegussie2.npkn.net/payment-alx',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    const resp = await sendQuery({
      query: {
        ticket_id: id,
        user_id: identityStore.profile.userId,
        first_name: checkoutStore.getFirstName,
        last_name: checkoutStore.getLastName,
        phone: checkoutStore.getPhone,
        currency: 'ETB',
        amount: checkoutStore.result.price,
      },
    });
    console.log(resp);
    if (resp.data) {
      window.location.href = resp.data;
    }
  } catch (error) {
    console.log(error);
  }
}

// function onPaymentSuccess() {
//   paymentLoading.value = true;
//   setTimeout(() => (paymentLoading.value = false), 2000);
//   paymentSuccess.value = true;
//   slide.value = slides.value[2];
// }

// function onPaymentError() {
//   paymentLoading.value = true;
//   setTimeout(() => (paymentLoading.value = false), 2000);
//   paymentSuccess.value = false;
//   slide.value = slides.value[2];
// }

function retry() {
  paymentSuccess.value = null;
  checkout();
}
</script>
