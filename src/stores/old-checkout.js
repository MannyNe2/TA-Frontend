import { defineStore } from 'pinia';

export const useOldCheckoutStore = defineStore('old-checkout', {
  state: () => ({
    paymentMode: null,
    billedPrice: null,
  }),
  getters: {},
  actions: {
    setPaymentMode(mode) {
      this.paymentMode = mode;
    },
    setBilledPrice(price) {
      this.billedPrice = price;
    },
  },
});
