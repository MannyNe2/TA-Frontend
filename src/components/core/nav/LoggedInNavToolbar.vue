<template>
  <q-toolbar class="q-px-none">
    <!-- <q-btn @click="toggleDrawer" icon="menu" flat round /> -->
    <q-toolbar-title class="row q-gutter-x-lg items-center">
      <HindekeLogo />
    </q-toolbar-title>
    <q-item clickable class="rounded-borders q-pa-none q-pl-md q-pr-md">
      <q-item-section>
        {{ profile.firstName }} {{ profile.lastName }}
      </q-item-section>
      <q-item section avatar class="q-pr-none">
        <q-avatar color="grey-4">
          <img v-if="profile.avatar" :src="profile.avatar" />
          <span v-else> {{ profile.firstName[0] }} </span>
        </q-avatar>
      </q-item>
      <q-menu anchor="bottom right" self="top right">
        <q-list style="min-width: 200px">
          <q-item clickable to="/ticket">
            <q-item-section avatar>
              <q-icon name="ti-ticket" size="xs" />
            </q-item-section>
            <q-item-section>
              <q-item-label> Tickets </q-item-label>
              <q-item-label caption> View your tickets </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable class="text-red" @click="logout">
            <q-item-section avatar>
              <q-icon name="ti-shift-right" size="xs" />
            </q-item-section>
            <q-item-section>
              <q-item-label> Logout </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-item>
  </q-toolbar>
</template>

<script>
import { useIdentityStore } from 'src/stores/identity';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import HindekeLogo from 'src/components/brand/HindekeLogo.vue';
import LinkMenu from 'src/components/core/menu/LinkMenu.vue';
import menuLinks from 'assets/data/landing-menu.json';

export default defineComponent({
  name: 'LoggedInNavToolbar',
  components: { HindekeLogo },
  setup() {
    const identityStore = useIdentityStore();
    const router = useRouter();

    const profile = ref(identityStore.profile);
    const links = ref(menuLinks);

    function logout() {
      identityStore.logout();
      router.push('/');
    }

    return {
      profile,
      links,
      logout,
    };
  },
});
</script>

<style>
.stuff {
  text-align: center;
}
</style>
