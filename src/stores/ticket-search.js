import { defineStore } from 'pinia';
import { hindekeClient } from 'src/config/apollo';
import search from 'src/queries/search.gql';

export const useTicketSearchStore = defineStore('ticket-search', {
  state: () => ({
    origin: null,
    destination: null,
    date: null,
    returnDate: null,
    passengers: 1,

    results: [],
  }),
  getters: {
    query: (state) =>
      state.origin && state.destination && state.date && state.passengers
        ? {
            origin: state.origin,
            destination: state.destination,
            date: state.date,
            returnDate: state.returnDate,
            passengers: state.passengers,
          }
        : false,
  },
  actions: {
    setOrigin(origin) {
      this.origin = origin;
    },
    setDestination(destination) {
      this.destination = destination;
    },
    setDate(date) {
      this.date = date;
    },
    setReturnDate(returnDate) {
      this.returnDate = returnDate;
    },
    setPassengers(passengers) {
      this.passengers = passengers;
    },

    // async search({ origin, destination, date, returnDate, passengers }) {
    //   this.origin = origin;
    //   this.destination = destination;
    //   this.date = date;
    //   this.returnDate = returnDate;
    //   this.passengers = passengers;
    //   this.results = getRoutes(
    //     this.origin,
    //     this.destination,
    //     this.date,
    //     this.returnDate,
    //     this.passengers
    //   );
    // },

    async search({ origin, destination, date }) {
      try {
        const res = await hindekeClient
          .query({
            query: search,
            variables: {
              origin: '%' + origin + '%',
              destination: '%' + destination + '%',
              date: date,
            },
          })
          .then(({ data }) => data && data.tickets_available);
        if (res) {
          this.results = res;
          return res;
        }
        //router.push('/home');
      } catch (error) {
        return error;
      }
    },
  },
});
