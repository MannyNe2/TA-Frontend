<template>
  <q-footer class="bg-grey-10">
    <!-- Links section -->
    <div class="row justify-center q-py-xl">
      <div class="col-8">
        <div class="row q-gutter-x-md">
          <div class="col-auto q-py-xl q-pr-md">
            <HindekeLogo light size="lg" />
          </div>

          <q-separator vertical class="bg-grey-9" inset />

          <div class="col row q-pa-md q-gutter-x-md">
            <div class="col">
              <h6 class="q-my-none text-h6 text-weight-bold">General</h6>
              <q-separator class="transparent q-mb-xs" />
              <div
                v-for="(menu, index) in groupedLinks.noChildren"
                :key="index"
              >
                <router-link class="clean-link" :to="menu.to">
                  <span class="text-grey-5 text-light">
                    {{ menu.label }}
                  </span>
                </router-link>
              </div>
            </div>

            <div
              class="col"
              v-for="(menu, index) in groupedLinks.hasChildren"
              :key="index"
            >
              <h6 class="q-my-none text-h6 text-weight-bold">
                {{ menu.label }}
              </h6>
              <q-separator class="transparent q-mb-xs" />
              <div v-for="(submenu, subIndex) in menu.sub" :key="subIndex">
                <router-link class="clean-link" :to="submenu.to">
                  <span class="text-grey-5">
                    {{ submenu.label }}
                  </span>
                </router-link>
              </div>
              <q-separator class="transparent" />
            </div>
          </div>

          <q-separator vertical class="bg-grey-9" inset />

          <div class="col-auto q-pa-md">
            <h6 class="q-my-none text-h6 text-weight-bold">Contact us</h6>
            <q-separator class="transparent q-mb-xs" />
            <span class="text-grey-5"> Contact info goes here </span>
          </div>
        </div>
      </div>
    </div>
    <!-- Bottom section -->
    <div class="bg-white-transparent q-py-sm text-center">
      <span class="text-grey-5">
        {{ new Date().getFullYear() }} © Hindeke Inc. All rights reserved.
      </span>
    </div>
  </q-footer>
</template>
<script setup>
import HindekeLogo from 'src/components/brand/HindekeLogo.vue';
import menuLinks from 'src/assets/data/landing-menu.json';
import { groupBy } from 'lodash-es';

menuLinks.unshift({
  label: 'Home',
  to: '/',
});

const groupedLinks = groupBy(menuLinks, (link) =>
  link.sub ? 'hasChildren' : 'noChildren'
);
</script>
<style scoped>
.bg-white-transparent {
  background-color: rgba(255, 255, 255, 0.1);
}
.clean-link {
  text-decoration: none;
}
</style>
