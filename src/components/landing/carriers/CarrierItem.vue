<template>
  <div class="text-center carriers-backdrop q-py-md q-px-xl">
    <q-avatar color="grey-4" size="xl">
      <img :src="carrier.image" />
    </q-avatar>
    <div class="q-pt-sm">
      {{ carrier.name }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['carrier']);
</script>
<style scoped>
.carriers-backdrop {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
</style>
