import { defineStore } from 'pinia';
import storage from 'store';
import { fakeLoginEndpoint } from 'src/services/fake-auth';
import { hindekeClient } from 'src/config/apollo';
import signIn from 'src/queries/signIn.gql';
import signUp from 'src/queries/signUp.gql';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();

export const useIdentityStore = defineStore('identity', {
  state: () => ({
    accessToken: null,
    userProfile: null,
    userRoles: [],
  }),
  getters: {
    token(state) {
      if (!state.accessToken) {
        state.accessToken = storage.get('token');
      }
      return state.accessToken;
    },
    profile(state) {
      if (!state.userProfile) {
        state.userProfile = storage.get('profile');
      }
      return state.userProfile;
    },
    roles(state) {
      if (!state.userRoles) {
        state.userRoles = storage.get('roles');
      }
      return state.userRoles;
    },
  },
  actions: {
    // TODO: CRITICAL: Find a good way to store tokens
    setToken(token) {
      this.accessToken = token;
      storage.set('token', token);
    },
    setProfile(profile) {
      this.userProfile = profile;
      storage.set('profile', profile);
    },
    setRoles(roles) {
      this.userRoles = roles;
      storage.set('roles', roles);
    },
    clear() {
      this.accessToken = this.userProfile = null;
      this.userRoles = [];
      // TODO: Delete token and data from storage
      storage.remove('token');
      storage.remove('profile');
    },

    async login(address, password) {
      // TODO: Call login endpoint here
      try {
        const res = await hindekeClient
          .query({
            query: signIn,
            variables: {
              address: address,
              password: password,
            },
          })
          .then(({ data }) => data && data.signIn);
        if (res) {
          console.log(res);
          const user = {
            firstName: res.firstName,
            lastName: res.lastName,
            middleName: res.middleName,
            phone: res.phone,
            userId: res.userId,
          };
          try {
            this.setToken(res.accessToken);
            this.setProfile(user);
            this.setRoles(res.role);
            Notify.create({
              message: 'User logged in',
              type: 'positive',
            });
            this.router.push('/');
          } catch (error) {
            console.error(error);
          }
        }
        //router.push('/home');
      } catch (error) {
        return error;
      }
    },

    async signup(credential) {
      // TODO: Call signup endpoint here
      try {
        const res = await hindekeClient
          .query({
            query: signUp,
            variables: {
              email: credential.email,
              first_name: credential.firstName,
              last_name: credential.lastName,
              middle_name: credential.middleName,
              password: credential.password,
              phone: credential.phone,
            },
          })
          .then(({ data }) => data && data.signUp);
        if (res) {
          const user = {
            firstName: res.firstName,
            lastName: res.lastName,
            userId: res.userId,
          };
          try {
            this.setToken(res.accessToken);
            this.setProfile(user);
            this.setRoles(res.role);
            Notify.create({
              message: 'User logged in',
              type: 'positive',
            });
            this.router.push('/');
          } catch (error) {
            console.error(error);
          }
        }
        //router.push('/home');
      } catch (error) {
        return error;
      }
    },

    async logout() {
      this.clear();
    },

    async refresh() {
      // TODO: Implement token refresh
    },
  },
});
