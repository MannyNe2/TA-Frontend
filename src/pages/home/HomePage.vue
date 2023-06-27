<template>
  <div class="row">
    <div class="col">
      <h1 class="text-center">Welcome, {{ profile.firstName }}!</h1>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useIdentityStore } from 'src/stores/identity';

const identityStore = useIdentityStore();
const profile = ref(identityStore.userProfile);
</script>
