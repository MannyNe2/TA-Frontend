<template>
  <q-layout view="lHh Lpr lff">
    <NavigationBar />
    <q-page-container>
      <router-view />
    </q-page-container>
    <LandingFooter />
  </q-layout>
</template>
<script setup>
import NavigationBar from 'src/components/core/nav/NavigationBar.vue';
import LandingFooter from 'src/components/core/footer/LandingFooter.vue';
</script>
