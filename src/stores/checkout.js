import { defineStore } from 'pinia';
import storage from 'store';

const SELECTED_RESULT_KEY = 'dev_book_route_selection';
const SELECTED_FNAME_KEY = 'dev_book_fname_selection';
const SELECTED_MNAME_KEY = 'dev_book_mname_selection';
const SELECTED_LNAME_KEY = 'dev_book_lname_selection';
const SELECTED_PHONE_KEY = 'dev_book_phone_selection';

//  TODO: Remove locastorage calls when adding actual fetches
export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    selectedResult: null,
    firstName: null,
    middleName: null,
    lastName: null,
    phone: null,
  }),
  getters: {
    result(state) {
      if (!state.selectedResult) {
        state.selectedResult = storage.get(SELECTED_RESULT_KEY);
      }
      if (state.selectedResult) {
        return state.selectedResult;
      }
      return false;
    },
    getFirstName(state) {
      if (!state.firstName) {
        state.firstName = storage.get(SELECTED_FNAME_KEY);
      }
      if (state.firstName) {
        return state.firstName;
      }
      return false;
    },
    getMiddleName(state) {
      if (!state.middleName) {
        state.middleName = storage.get(SELECTED_MNAME_KEY);
      }
      if (state.middleName) {
        return state.middleName;
      }
      return false;
    },
    getLastName(state) {
      if (!state.lastName) {
        state.lastName = storage.get(SELECTED_LNAME_KEY);
      }
      if (state.lastName) {
        return state.lastName;
      }
      return false;
    },
    getFullName(state) {
      if (!state.firstName && !state.middleName && !state.lastName) {
        state.firstName = storage.get(SELECTED_FNAME_KEY);
        state.middleName = storage.get(SELECTED_MNAME_KEY);
        state.lastName = storage.get(SELECTED_LNAME_KEY);
      }
      if (state.firstName && state.middleName && state.lastName) {
        return `${state.firstName} ${state.middleName} ${state.lastName}`;
      }
      return false;
    },
    getPhone(state) {
      if (!state.phone) {
        state.phone = storage.get(SELECTED_PHONE_KEY);
      }
      if (state.phone) {
        return state.phone;
      }
      return false;
    },
  },
  actions: {
    setSelection(result) {
      storage.set(SELECTED_RESULT_KEY, result);
      this.selectedResult = result;
    },
    setFirstName(firstName) {
      storage.set(SELECTED_FNAME_KEY, firstName);
      this.firstName = firstName;
    },
    setMiddleName(middleName) {
      storage.set(SELECTED_MNAME_KEY, middleName);
      this.middleName = middleName;
    },
    setLastName(lastName) {
      storage.set(SELECTED_LNAME_KEY, lastName);
      this.lastName = lastName;
    },
    setPhone(phone) {
      storage.set(SELECTED_PHONE_KEY, phone);
      this.phone = phone;
    },
    clear() {
      this.selectedResult = null;
      storage.remove(SELECTED_RESULT_KEY);
    },
  },
});
