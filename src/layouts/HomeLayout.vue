<template>
  <q-layout view="lHh Lpr lff">
    <NavigationBar />
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer></q-footer>
  </q-layout>
</template>
<script>
import NavigationBar from 'src/components/core/nav/NavigationBar.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'LandingLayout',
  components: {
    NavigationBar,
  },
});
</script>
