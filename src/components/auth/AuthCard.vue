<template>
  <q-scroll-area
    class="no-box-shadow overflow-hidden-x"
    style="height: 100vh; width: 400px"
  >
    <q-carousel
      animated
      v-model="slide"
      class="rounded-borders q-pb-xl auth-card mdi-box-shadow"
      transition-prev="jump-up"
      transition-next="jump-down"
      transition-duration="500"
      style="height: 100%"
    >
      <q-carousel-slide :name="slides.login">
        <LoginCard @select-signup="toSlide(slides.signup)" />
      </q-carousel-slide>
      <q-carousel-slide :name="slides.signup">
        <SignUpCard @select-login="toSlide(slides.login)" />
      </q-carousel-slide>
    </q-carousel>
  </q-scroll-area>
</template>
<script>
import { defineComponent, ref } from 'vue';
import LoginCard from 'src/components/auth/LoginCard.vue';
import SignUpCard from 'src/components/auth/SignUpCard.vue';

const slideNames = {
  signup: 'signup',
  login: 'login',
};

export default defineComponent({
  name: 'AuthCard',
  components: {
    LoginCard,
    SignUpCard,
  },
  props: {
    startSignup: { type: Boolean, default: false },
  },

  setup(props) {
    const slide = ref(props.startSignup ? slideNames.signup : slideNames.login);

    const slides = ref(slideNames);

    function toSlide(newSlide) {
      slide.value = newSlide;
    }

    return {
      slide,
      slides,
      toSlide,
    };
  },
});
</script>
