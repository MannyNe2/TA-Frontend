<template>
  <q-layout view="lHr Lpr lff" class="bg-light-page">
    <NavigationBar
      :lightBackground="'bg-light-page-translucent'"
      :darkBackground="'bg-dark-page-translucent'"
    />
    <q-page-container class="full-height">
      <div class="row justify-center items-center">
        <div class="col col-auto">
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import NavigationBar from 'src/components/core/nav/NavigationBar.vue';
</script>
