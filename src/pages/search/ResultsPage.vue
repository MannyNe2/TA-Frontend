<template>
  <div>
    <h4 v-if="results && results.length" class="q-mb-none text-weight-bold">
      Search results ({{ results.length }})
    </h4>
    <!-- <h3 v-else class="text-weight-medium">No results found</h3> -->
    <div class="row q-gutter-xl q-pt-lg">
      <div class="xs-hide sm-hide col col-3 q-gutter-y-md">
        <SearchResultsFilter />
      </div>
      <div class="col q-gutter-y-md" v-if="results">
        <SearchResultCard
          v-for="result in results"
          v-bind:key="result.id"
          :result="result"
          :passengers="store.query.passengers"
        />
      </div>
      <div v-else class="col q-gutter-y-md">
        <h4 class="text-center text-grey-7 text-weight-light">
          No results found
        </h4>
      </div>
    </div>
  </div>
</template>
<script setup>
import SearchResultsFilter from 'src/components/search/SearchResultsFilter.vue';
import SearchResultCard from 'src/components/search/SearchResultCard.vue';
import { useTicketSearchStore } from 'src/stores/ticket-search';
import { computed } from 'vue';
import { getTransitRoutes } from 'src/services/fake-tickets.js';

const store = useTicketSearchStore();

const results = computed(() => {
  const query = store.query;
  return query ? getTransitRoutes(query) : false;
});
</script>
