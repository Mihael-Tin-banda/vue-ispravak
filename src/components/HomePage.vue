<template>
  <div class="w-full h-screen flex flex-col justify-between overflow-auto cutive-mono-regular">
    <h1 class="text-5xl relative text-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
      "STEPS"
    </h1>
    <div class="flex justify-between items-center relative">
      <p id="coinDisplay" class="border-color border-2 p-2 border-dashed ml-2">Coins: {{ coins }}</p>
      <div class="flex">
        <button id="Authenticate" class="border-color border-2 p-2 border-dashed hover:bg-red-500 mr-2" @click="authenticate">
          Authenticate
        </button>
        <button id="Get_KK" class="border-color border-2 p-2 border-dashed hover:bg-red-500 mr-2" @click="handleRequest">
          Get KorakKoins
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3">
      <router-link to="/pachinko" class="group relative block h-64 sm:h-80">
        <span class="absolute inset-0 border-2 border-dashed border-color"></span>
        <div class="relative flex h-full transform items-end border-2 border-color bg-color transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div class="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
            <img src="../assets/ikone/pachinko.svg" class="filter-white svg-size" />
            <h2 class="mt-4 text-xl sm:text-2xl">Pachinko</h2>
          </div>
          <div class="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
            <h3 class="mt-4 text-xl sm:text-2xl">Pachinko</h3>
            <p class="mt-4 text-sm sm:text-base">Suck the balls into the hole and win the game.</p>
            <p class="mt-8 font-bold border-color border-2 p-2 border-dashed w-fit hover:bg-red-500">Press</p>
          </div>
        </div>
      </router-link>
      <router-link to="/mines" class="group relative block h-64 sm:h-80">
        <span class="absolute inset-0 border-2 border-dashed border-color"></span>
        <div class="relative flex h-full transform items-end border-2 border-color bg-color transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div class="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
            <img src="../assets/ikone/bomb.svg" class="filter-white" />
            <h2 class="mt-4 text-xl sm:text-2xl">Mines</h2>
          </div>
          <div class="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
            <h3 class="mt-4 text-xl sm:text-2xl">Mines</h3>
            <p class="mt-4 text-sm sm:text-base">Mines are everywhere. You have to find them and avoid them.</p>
            <p class="mt-8 font-bold border-color border-2 p-2 border-dashed w-fit hover:bg-red-500">Press</p>
          </div>
        </div>
      </router-link>
      <router-link to="/lucky-numbers" class="group relative block h-64 sm:h-80">
        <span class="absolute inset-0 border-2 border-dashed border-color"></span>
        <div class="relative flex h-full transform items-end border-2 border-color bg-color transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div class="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
            <img src="../assets/ikone/clover-solid.svg" class="filter-white svg-size" />
            <h2 class="mt-4 text-xl sm:text-2xl">Lucky Numbers</h2>
          </div>
          <div class="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
            <h3 class="mt-4 text-xl sm:text-2xl">Lucky Numbers</h3>
            <p class="mt-4 text-sm sm:text-base">Lucky Numbers are a game of luck</p>
            <p class="mt-8 font-bold border-color border-2 p-2 border-dashed w-fit hover:bg-red-500">Press</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { auth, db, doc, getDoc, setDoc, signInWithPopup, GoogleAuthProvider } from '../firebase';
import { getFitnessData } from '../services/googleFit';

export default {
  name: 'HomePage',
  setup() {
    const store = useStore();
    const coins = computed(() => store.state.coins);

    return {
      coins,
    };
  },
  methods: {
    base64UrlDecode(input) {
      const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
      const decodedData = atob(base64);
      const jsonPayload = decodeURIComponent(decodedData.split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    },

    async authenticate() {
      try {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/fitness.activity.read');
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('User authenticated:', user);

        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { email: user.email }, { merge: true });

        const tokenResult = await user.getIdTokenResult();
        if (tokenResult && tokenResult.token) {
          sessionStorage.setItem('access_token', tokenResult.token);
          sessionStorage.setItem('refresh_token', user.stsTokenManager.refreshToken);
          console.log('Access token set in session storage:', tokenResult.token);

          // Decode the token to check scopes
          const base64Url = tokenResult.token.split('.')[1];
          const decodedToken = this.base64UrlDecode(base64Url);
          console.log('Decoded token:', decodedToken);
          if (!decodedToken.scope || !decodedToken.scope.includes('https://www.googleapis.com/auth/fitness.activity.read')) {
            console.error('Required scope is missing in the token');
          } else {
            console.log('Token includes required scope');
          }
        } else {
          console.error('Failed to get access token from tokenResult:', tokenResult);
        }
      } catch (error) {
        console.error('Error during authentication', error);
      }
    },

    async getTokenFromFirebaseAuth() {
      try {
        const user = auth.currentUser;
        if (user) {
          const tokenResult = await user.getIdTokenResult(true);
          if (tokenResult && tokenResult.token) {
            console.log('Access token from Firebase Auth:', tokenResult.token);
            return tokenResult.token;
          }
        }
      } catch (error) {
        console.error('Error retrieving token from Firebase Auth', error);
      }
      return null;
    },

    async refreshAccessToken() {
      try {
        const refreshToken = sessionStorage.getItem('refresh_token');
        const response = await fetch('https://securetoken.googleapis.com/v1/token?key=AIzaSyCa_Fi6DH0r0Eg-dytRD2Q-Psv705K-Vgk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
          })
        });
        const data = await response.json();
        if (data.access_token) {
          console.log('New access token:', data.access_token);
          sessionStorage.setItem('access_token', data.access_token);
          return data.access_token;
        } else {
          console.error('Failed to refresh access token:', data);
        }
      } catch (error) {
        console.error('Failed to refresh access token:', error);
        return null;
      }
    },

    async handleRequest() {
      const user = auth.currentUser;
      if (!user) {
        console.log('You need to authenticate first');
        return;
      }

      console.log('User is authenticated:', user);

      try {
        let accessToken = sessionStorage.getItem('access_token');
        if (!accessToken) {
          console.warn('Access token is missing from session storage, retrieving from Firebase Auth');
          accessToken = await this.getTokenFromFirebaseAuth();
          if (accessToken) {
            sessionStorage.setItem('access_token', accessToken);
            console.log('Access token set in session storage:', accessToken);
          } else {
            console.error('Failed to retrieve access token');
            return;
          }
        }

        const steps = await getFitnessData(accessToken);
        if (!steps) {
          console.error('Failed to fetch the step count data');
          return;
        }
        console.log('Current step count:', steps);

        const coinsEarned = Math.round((steps / 100) * 10) / 10;
        console.log('Coins earned:', coinsEarned);

        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          let currentCoins = userDoc.data().coins || 0;
          currentCoins += coinsEarned;

          console.log('Updating coins:', currentCoins);
          await setDoc(userRef, { coins: currentCoins }, { merge: true });

          this.$store.commit('updateCoins', currentCoins);
        } else {
          console.log('Setting initial coins:', coinsEarned);
          await setDoc(userRef, { coins: coinsEarned }, { merge: true });
          this.$store.commit('updateCoins', coinsEarned);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.warn('Access token expired, refreshing...');
          const newAccessToken = await this.refreshAccessToken();
          if (newAccessToken) {
            sessionStorage.setItem('access_token', newAccessToken);
            this.handleRequest();
          } else {
            console.error('Failed to refresh access token');
          }
        } else {
          console.error('Failed to fetch the step count data', error);
        }
      }
    },
  },
  mounted() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        if (navigator.onLine) {
          try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              this.$store.commit('updateCoins', userData.coins || 0);
            }
          } catch (error) {
            console.error('Failed to fetch user data from Firestore', error);
          }
        } else {
          console.error('Client is offline');
        }
      }
    });
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
