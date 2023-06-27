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
        <span>
          <div>
            <div class="row justify-center">
              <q-icon name="fa-solid fa-check-circle" color="green" size="xl" />
            </div>
            <p class="text-center q-pt-md text-subtitle2">Payment Successful</p>
            <q-separator class="q-my-lg" />
            <p class="text-center">Your spot has been booked!</p>
            <p class="text-center text-grey-7">ID: {{ route.params.id }}</p>
            <q-img :src="imgg" class="rounded-borders" style="width: 100%" />
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
import { useRoute } from 'vue-router';
import { faker } from '@faker-js/faker';

const slides = ref(['confirm', 'checkout']);
const slide = ref(slides.value[0]);
const route = useRoute();
const imgg = new URL('/images/QR.png', import.meta.url).href;
</script>
