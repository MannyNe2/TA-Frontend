<template>
  <q-card flat bordered class="rounded-md overflow-hidden q-pa-lg">
    <div class="row q-gutter-lg">
      <!-- Logo -->
      <div class="col col-auto">
        <q-avatar size="xl">
          <img :src="result.vehicle.transit_company.logo" />
        </q-avatar>
      </div>
      <!-- Content -->
      <div class="col">
        <!-- Top row -->
        <div class="row q-gutter-lg">
          <div class="col">
            <!-- Company -->
            <div>
              <h6 class="q-my-none">
                {{ result.vehicle.transit_company.name }}
              </h6>
              <h6 class="q-my-none q-py-none text-subtitle1 text-grey-7">
                {{ result.vehicle.type }}
              </h6>
            </div>
            <!-- Route -->
            <q-card bordered flat class="bg-grey-3 q-my-md q-pa-md">
              <div class="row q-gutter-lg">
                <div class="col">
                  <h6 class="q-my-none text-body2 text-primary">Origin</h6>
                  <h6 class="q-my-none text-weight-regular">
                    {{ result.origin }}
                  </h6>
                  <q-separator class="q-my-sm" />
                  <h6
                    class="q-mb-none q-mt-sm text-subtitle2 text-weight-regular text-grey-7"
                  >
                    {{ formatDate(new Date(result.leave_date), 'PPPP') }}
                  </h6>
                  <h6
                    class="q-my-none q-py-none text-weight-regular text-grey-7"
                  >
                    {{ formatDate(new Date(result.leave_date), 'p') }}
                  </h6>
                </div>
                <div
                  class="col-auto row flex-center align-center q-pb-lg q-px-lg"
                >
                  <q-icon name="ti-arrow-right" size="sm" color="primary" />
                </div>
                <div class="col text-right">
                  <h6 class="q-my-none text-body2 text-primary">Destination</h6>
                  <h6 class="q-my-none text-weight-regular">
                    {{ result.destination }}
                  </h6>
                  <q-separator class="q-my-sm" />
                  <h6
                    class="q-my-none text-subtitle2 text-weight-regular text-grey-7"
                  >
                    {{ formatDate(new Date(result.return_date), 'PPPP') }}
                  </h6>
                  <h6
                    class="q-my-none q-py-none text-subtitle-2 text-weight-regular text-grey-7"
                  >
                    {{ formatDate(new Date(result.leave_date), 'p') }}
                  </h6>
                </div>
              </div>
            </q-card>
            <!-- Seating -->
            <h6
              class="q-my-none text-weight-light text-primary text-subtitle1 text-right"
            >
              <span class="text-weight-bold">
                {{ result.vehicle.capacity }}
              </span>
              seats available,
              <span class="text-weight-bold">
                {{ result.vehicle.capacity - result.vehicle.booked_seats }}
              </span>
              occupied
            </h6>
          </div>
          <!-- Price -->
          <h6 class="text-weight-bold text-center">
            {{ formatPrice(result.price) }} Br
          </h6>
        </div>
        <q-separator class="q-mt-md q-mb-lg" />
        <!--Bottom row-->
        <div class="row justify-between items-center">
          <!-- Tags -->
          <div class="row col items-center q-gutter-x-sm">
            <h6 class="q-my-none text-subtitle2">Tags:</h6>
            <span v-if="result.vehicle.tags && result.vehicle.tags.length > 0">
              <q-chip
                outline
                v-for="(tag, index) in result.vehicle.tags"
                v-bind:key="index"
                color="grey-7"
                class="text-capitalize"
                square
              >
                {{ tag }}
              </q-chip>
            </span>
            <span v-else>
              <q-chip outline color="grey-7" class="no-border" square>
                No Tags
              </q-chip>
            </span>
          </div>
          <!-- Actions -->
          <div class="col-auto q-gutter-x-md">
            <q-btn
              flat
              color="primary"
              label="View Details"
              size="md"
              class="text-capitalize text-weight-regular rounded-borders"
            />
            <q-btn
              unelevated
              color="primary"
              label="Book Now"
              size="md"
              padding="sm xl"
              class="text-capitalize text-weight-regular rounded-borders"
              @click="bookNow(result.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue';
import { format } from 'date-fns';
import { formatPrice } from 'src/utils/money';
import { faker } from '@faker-js/faker';
import { useRouter } from 'vue-router';
import { useCheckoutStore } from 'src/stores/checkout';

export default defineComponent({
  name: 'SearchResultCard',
  props: {
    result: { required: true },
    passengers: { required: true, type: Number },
  },
  setup(props) {
    const router = useRouter();
    const checkoutStore = useCheckoutStore();

    function formatDate(date, formatString) {
      return format(date, formatString);
    }

    function bookNow(id) {
      checkoutStore.setSelection({
        ...props.result,
        passengers: parseInt(props.passengers),
      });
      //const id = faker.datatype.uuid();
      // router.push(`/book/${id}`);
      router.push({ name: 'book-start', params: { id: id } });
    }

    return {
      formatPrice,
      formatDate,
      bookNow,
    };
  },
});
</script>
