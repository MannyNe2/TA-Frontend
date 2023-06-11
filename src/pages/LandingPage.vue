<template>
  <q-layout view="hhh lpr fff">
    <div class="row justify-center">
      <div class="col col-xl-8">
        <div class="row justify-between q-py-xl">
          <div class="col-xl-5 col-md-5 col-xs-12 q-pr-xl q-pl-xl">
            <h2 class="col-sm-0 q-my-md text-weight-medium">
              Find cheap tickets to your next travel destination.
            </h2>
            <h5 class="q-mt-sm q-mb-none text-grey-7 text-weight-light">
              Travel shouldn't cost a fortune!
            </h5>
            <q-separator class="q-my-sm" />
            <BookingForm />
          </div>
          <div class="xs-hide sm-hide col q-pl-xl q-pr-none q-pr-xl-md">
            <q-carousel
              v-model="slide"
              vertical
              infinite
              autoplay
              animated
              transition-next="slide-up"
              transition-prev="slide-down"
              transition-duration="500"
              class="full-height"
            >
              <q-carousel-slide
                class="q-pr-none"
                v-for="image in carouselImages"
                v-bind:key="image"
                :name="image"
              >
                <q-img
                  :src="`/images/${folder}/${image}`"
                  ratio="1"
                  width="100%"
                  fit="cover"
                  class="rounded-lg"
                />
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
      </div>
    </div>

    <div class="full-width landing-image text-white full-height">
      <div class="bg-dark-page-translucent row justify-center">
        <div class="col-8 q-py-xl">
          <h3 class="text-center text-weight-light q-my-none">Our Clients</h3>
          <div class="q-pt-xl">
            <CarriersList />
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>
<script setup>
import { ref } from 'vue';
import BookingForm from 'src/components/booking/BookingForm.vue';
import CarriersList from 'src/components/landing/carriers/CarriersList.vue';

// Toggle
const stockImagesMode = false;

// Filenames
const carouselImagesStock = [
  'dest_aerial.jpg',
  'dest_boat.jpg',
  'dest_canyon.jpg',
  'vehi_bus.jpg',
  'vehi_plane.jpg',
  'vehi_train.jpg',
];
const carouselImagesEth = ['01.webp', '02.jpg', '03.jpg', '04.jpg', '05.jpg'];

// Reactive variables
const folder = stockImagesMode
  ? ref('landing_carousel')
  : ref('landing_carousel_eth');
const carouselImages = stockImagesMode
  ? ref(carouselImagesStock)
  : ref(carouselImagesEth);

const slide = ref(carouselImages.value[0]);
</script>
<style lang="scss" scoped>
.rounded-lg {
  border-radius: 32px;
}

.landing-image {
  background-image: url('/images/background-2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

@media (max-width: $breakpoint-xl-min) {
  .rounded-lg {
    border-radius: 32px 0px 0px 32px;
  }
}
</style>
