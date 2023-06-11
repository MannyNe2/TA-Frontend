<template>
  <div class="row justify-center q-gutter-lg">
    <div class="col-auto" v-for="(carrier, index) in carriers" :key="index">
      <CarrierItem :carrier="carrier" />
    </div>
  </div>
</template>
<script setup>
import CarrierItem from './CarrierItem.vue';
import carriers from 'src/assets/data/carriers.json';
</script>
