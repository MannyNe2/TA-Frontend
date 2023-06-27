<template>
  <q-layout view="lHh Lpr lff" class="bg-light-page">
    <NavigationBar
      :lightBackground="'bg-light-page-translucent'"
      :darkBackground="'bg-dark-page-translucent'"
    />
    <q-page-container>
      <div class="row justify-center">
        <div class="col col-8">
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import NavigationBar from 'src/components/core/nav/NavigationBar.vue';
</script>
