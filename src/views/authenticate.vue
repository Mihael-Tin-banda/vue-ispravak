<template>
  <div>
    <button @click="authenticate">Authenticate</button>
    <button @click="handleRequest">Get KK</button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { auth, provider, signInWithPopup, db, doc, getDoc, setDoc } from '../firebase';

export default {
  data() {
    return {
      userId: null,
      steps_sub: 0,
      Balance: 0,
    };
  },
  methods: {
    ...mapActions(['fetchCoins', 'saveCoins']),
    ...mapMutations(['updateCoins', 'setCoins']),
    
    async authenticate() {
      try {
        const result = await signInWithPopup(auth, provider);
        this.userId = result.user.uid;
        await this.fetchCoins(this.userId);
        const userDoc = await getDoc(doc(db, "users", this.userId));
        if (!userDoc.exists()) {
          await setDoc(doc(db, "users", this.userId), { coins: 10 });
          this.setCoins(10);
        }
      } catch (error) {
        console.error("Authentication failed:", error);
      }
    },
    async handleRequest() {
      if (!this.userId) {
        console.log("You need to authenticate first");
        return;
      }

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
          this.Balance += pom_var - this.steps_sub;
          this.steps_sub = pom_var;
          this.updateCoins(this.Balance);
          await this.saveCoins(this.userId);
          console.log('Balance:', this.Balance);
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
