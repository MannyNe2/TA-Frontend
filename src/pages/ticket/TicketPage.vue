<template>
  <q-card class="q-pa-lg" style="width: 400px">
    <!-- TODO: Add error page if ticket unavailable -->
    <q-carousel
      v-model="slide"
      v-if="!changeSlide"
      animated
      swipeable
      navigation
      padding
      arrows
      transition-next="jump-left"
      transition-prev="jump-right"
      style="height: auto"
    >
      <q-carousel-slide :name="slides[0]">
        <div v-if="paymentLoading">
          <h5 class="q-my-none text-center">Processing...</h5>
          <p class="text-center text-subtitle1 text-grey-7">
            Please wait while we fetch your tickets
          </p>
          <div class="q-py-md row justify-center">
            <q-circular-progress color="primary" indeterminate size="xl" />
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-carousel
      v-model="resultSingle"
      v-else
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="black"
      navigation
      padding
      arrows
      height="auto"
      class="bg-primary text-white shadow-1 rounded-borders"
    >
      <q-carousel-slide
        v-for="result in results"
        :key="result.id"
        :name="result"
      >
        <span>
          <div>
            <div class="row justify-center">
              <q-icon name="fa-solid fa-check-circle" color="green" size="xl" />
            </div>
            <p class="text-center q-pt-md text-subtitle2">
              Your spot has been booked!
            </p>
            <q-separator class="q-my-lg" />
            <div class="row q-gutter-lg">
              <div class="col">
                <!-- Route -->
                <q-card bordered flat class="bg-primary q-my-md q-pa-md">
                  <div class="row q-gutter-lg">
                    <div class="col">
                      <h6 class="q-my-none text-weight-regular">
                        {{
                          result.transaction.tickets_available.start_location
                        }}
                      </h6>
                    </div>
                    <div
                      class="col-auto row flex-center align-center q-pb-lg q-px-lg q-pt-lg"
                    >
                      <q-icon name="ti-arrow-right" size="sm" color="black" />
                    </div>
                    <div class="col text-right">
                      <h6 class="q-my-none text-weight-regular">
                        {{ result.transaction.tickets_available.destination }}
                      </h6>
                    </div>
                  </div>
                </q-card>
              </div>
            </div>
            <p class="text-center"></p>
            <p class="text-center text-white-7">ID: {{ result.id }}</p>
            <q-img
              :src="imgg"
              id="QR"
              class="rounded-borders"
              style="width: 100%"
            />
          </div>
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
import getTickets from 'src/queries/getTickets.gql';
import { provideApolloClient, useQuery } from '@vue/apollo-composable';
import qr from 'qrcode';

const slides = ref(['confirm', 'checkout']);
const slide = ref(slides.value[0]);

const results = ref(null);
const resultSingle = ref(null);

const changeSlide = ref(false);

const route = useRoute();
const id = route.params.id;

const checkoutStore = useCheckoutStore();

const paymentLoading = ref(true);
const paymentSuccess = ref(true);
const variables = ref({
  id: id,
});
const imgg = ref(null);

// TODO: DO NOT UNDER ANY CIRCUMSTANCES KEEP THIS OUTSIDE OF DEMO PURPOSES
// const price = route.query.price;
const parsedPrice = parseInt(checkoutStore.result.price);
const price = parsedPrice === NaN ? 0 : parsedPrice;

onMounted(() => {
  checkout();
});

async function checkout() {
  try {
    const res = await hindekeClient
      .query({
        query: getTickets,
      })
      .then(({ data }) => data && data.tickets_bought);
    if (res) {
      console.log(res);
      results.value = res;
      resultSingle.value = res[0];
      qr.toDataURL(res[0].id, (err, url) => {
        imgg.value = url;
      });
      setTimeout(() => (changeSlide.value = true), 3000);
    }
    //router.push('/home');
  } catch (error) {
    return error;
  }
}

function retry() {
  paymentSuccess.value = null;
  checkout();
}
</script>
