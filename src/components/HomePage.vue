<template>
  <div class="w-full h-screen flex flex-col justify-between overflow-auto cutive-mono-regular">
    <h1 class="text-5xl relative text-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
      "STEPS"
    </h1>
    <div class="flex justify-between items-center relative">
      <p id="coinDisplay" class="border-color border-2 p-2 border-dashed ml-2">Coins: {{ coins }}</p>
      <div class="flex">
        <button
          class="border-color border-2 p-2 border-dashed hover:bg-red-500 mr-2"
          @click="authenticate"
        >
          Authenticate
        </button>
        <button
          class="border-color border-2 p-2 border-dashed hover:bg-red-500 mr-2"
          @click="handleRequest"
        >
          Get KorakKoins
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3">
      <router-link
        to="/pachinko"
        class="group relative block h-64 sm:h-80"
      >
        <span
          class="absolute inset-0 border-2 border-dashed border-color"
        ></span>
        <div
          class="relative flex h-full transform items-end border-2 border-color bg-color transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
        >
          <div
            class="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"
          >
            <img src="../assets/ikone/pachinko.svg" class="filter-white svg-size" />
            <h2 class="mt-4 text-xl sm:text-2xl">Pachinko</h2>
          </div>
          <div
            class="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"
          >
            <h3 class="mt-4 text-xl sm:text-2xl">Pachinko</h3>
            <p class="mt-4 text-sm sm:text-base">
              Suck the balls into the hole and win the game.
            </p>
            <p
              class="mt-8 font-bold border-color border-2 p-2 border-dashed w-fit hover:bg-red-500"
            >
              Press
            </p>
          </div>
        </div>
      </router-link>
      <router-link
        to="/mines"
        class="group relative block h-64 sm:h-80"
      >
        <span
          class="absolute inset-0 border-2 border-dashed border-color"
        ></span>
        <div
          class="relative flex h-full transform items-end border-2 border-color bg-color transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
        >
          <div
            class="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"
          >
            <img src="../assets/ikone/bomb.svg" class="filter-white" />
            <h2 class="mt-4 text-xl sm:text-2xl">Mines</h2>
          </div>
          <div
            class="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"
          >
            <h3 class="mt-4 text-xl sm:text-2xl">Mines</h3>
            <p class="mt-4 text-sm sm:text-base">
              Mines are everywhere. You have to find them and avoid them.
            </p>
            <p
              class="mt-8 font-bold border-color border-2 p-2 border-dashed w-fit hover:bg-red-500"
            >
              Press
            </p>
          </div>
        </div>
      </router-link>
      <a
        href="docs/lucky numbers/index.html"
        class="group relative block h-64 sm:h-80"
      >
        <span
          class="absolute inset-0 border-2 border-dashed border-color"
        ></span>
        <div
          class="relative flex h-full transform items-end border-2 border-color bg-color transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
        >
          <div
            class="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"
          >
            <img src="../assets/ikone/clover-solid.svg" class="filter-white svg-size" />
            <h2 class="mt-4 text-xl sm:text-2xl">Lucky Numbers</h2>
          </div>
          <div
            class="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"
          >
            <h3 class="mt-4 text-xl sm:text-2xl">Lucky Numbers</h3>
            <p class="mt-4 text-sm sm:text-base">
              Lucky Numbers are a game of luck
            </p>
            <p
              class="mt-8 font-bold border-color border-2 p-2 border-dashed w-fit hover:bg-red-500"
            >
              Press
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

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
    authenticate() {
      var clientId = "786268764964-07k8euka1hg47u2amgl6fe5u4fko9j81.apps.googleusercontent.com";
      var redirectUri = window.location.origin;
      var scope = "https://www.googleapis.com/auth/fitness.activity.read";
      var authUrl =
        "https://accounts.google.com/o/oauth2/v2/auth" +
        "?client_id=" +
        clientId +
        "&redirect_uri=" +
        redirectUri +
        "&scope=" +
        scope +
        "&response_type=token";
      window.location.href = authUrl;
    },
    handleRequest() {
      var access_token = sessionStorage.getItem("access_token");
      if (!access_token) {
        console.log("You need to authenticate first");
        return;
      }

      var xhr = new XMLHttpRequest();
      xhr.onload = async () => {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          var steps = 0;
          if (response.bucket && response.bucket.length > 0) {
            var dataset = response.bucket[0].dataset[0];
            if (dataset.point && dataset.point.length > 0) {
              steps = dataset.point[0].value[0].intVal;
            }
          }
          var pom_var = Math.round((steps / 100) * 10) / 10;
          this.$store.commit('updateCoins', parseFloat(this.$store.state.coins) + pom_var - this.steps_sub);
          this.steps_sub = pom_var;
          await this.$store.dispatch('saveCoins', this.userId);
          console.log('Balance:', this.$store.state.coins);
          setTimeout(() => location.reload(), 100);
        } else if (xhr.status === 401) {
          this.refreshToken();
        } else {
          console.log("Failed to fetch the step count data", xhr.status, xhr.responseText);
        }
      };

      xhr.onerror = () => console.log("Network error");

      xhr.open("POST", "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate");
      xhr.setRequestHeader("Authorization", "Bearer " + access_token);
      xhr.setRequestHeader("Content-Type", "application/json");

      var now = new Date();
      var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      var timestamp = startOfDay.getTime();

      var data = JSON.stringify({
        aggregateBy: [{
          dataTypeName: "com.google.step_count.delta",
          dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
        }],
        bucketByTime: { durationMillis: now - timestamp },
        startTimeMillis: timestamp,
        endTimeMillis: now.getTime(),
      });

      xhr.send(data);
    },
    refreshToken() {
      var refresh_token = sessionStorage.getItem("refresh_token");
      var xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          sessionStorage.setItem("access_token", response.access_token);
        } else {
          console.log("Failed to refresh token", xhr.status, xhr.responseText);
        }
      };

      xhr.open("POST", "https://oauth2.googleapis.com/token");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      var data =
        "refresh_token=" +
        refresh_token +
        "&client_id=" +
        "786268764964-07k8euka1hg47u2amgl6fe5u4fko9j81.apps.googleusercontent.com" +
        "&client_secret=" +
        "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" +
        "&grant_type=refresh_token";

      xhr.send(data);
    },
  },
  mounted() {
    var accessToken = this.getParameterByName('access_token');
    if (accessToken) {
      sessionStorage.setItem('access_token', accessToken);
    }
    setInterval(() => {
      var now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        this.steps_sub = 0;
      }
    }, 60000);
  },
};
</script>

<style scoped>
</style>
