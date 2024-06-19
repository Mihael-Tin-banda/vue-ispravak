<template>
  <div>
    <button @click="authenticate">Authenticate</button>
    <button @click="handleRequest">Get KK</button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { auth, provider, signInWithPopup, doc, getDoc, setDoc, db } from '../firebase';

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
    ...mapMutations(['updateCoins', 'setCoins', 'setUser']),
    
    async authenticate() {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        this.userId = user.uid;
        this.setUser({ id: this.userId, name: user.displayName });
        await this.fetchCoins(this.userId);
        const userDoc = await getDoc(doc(db, "users", this.userId));
        if (!userDoc.exists()) {
          await setDoc(doc(db, "users", this.userId), { coins: 10 });
          this.setCoins(10);
        }

        const tokenResult = await user.getIdTokenResult();
        if (tokenResult && tokenResult.token) {
          sessionStorage.setItem('access_token', tokenResult.token);
          sessionStorage.setItem('refresh_token', user.stsTokenManager.refreshToken);
          console.log('Access token set in session storage:', tokenResult.token);
        } else {
          console.error('Failed to get access token from tokenResult:', tokenResult);
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

      let access_token = sessionStorage.getItem("access_token");
      if (!access_token) {
        console.log("Access token is missing, retrieving from Firebase Auth");
        const tokenResult = await auth.currentUser.getIdTokenResult(true);
        access_token = tokenResult.token;
        sessionStorage.setItem('access_token', access_token);
      }

      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const response = await fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + access_token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          aggregateBy: [{
            dataTypeName: "com.google.step_count.delta",
            dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
          }],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: startOfDay.getTime(),
          endTimeMillis: Date.now(),
        })
      });

      if (response.ok) {
        const data = await response.json();
        const steps = data.bucket.reduce((total, bucket) => {
          return total + (bucket.dataset[0].point[0]?.value[0]?.intVal || 0);
        }, 0);

        console.log('Current step count:', steps);

        const coinsEarned = Math.round((steps / 100) * 10) / 10;
        console.log('Coins earned:', coinsEarned);

        const userRef = doc(db, 'users', this.userId);
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
      } else if (response.status === 401) {
        console.error("Unauthorized access, try re-authenticating");
      } else {
        console.error("Failed to fetch the step count data", response.status, response.statusText);
      }
    },

    checkTokenValidity(token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decodedToken = JSON.parse(jsonPayload);
        console.log('Decoded Token:', decodedToken);

        if (decodedToken.scope && decodedToken.scope.includes('https://www.googleapis.com/auth/fitness.activity.read')) {
          console.log('Token has the necessary permissions.');
          return true;
        } else {
          console.error('Token is missing the necessary permissions.');
          return false;
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    },
  },
  mounted() {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      sessionStorage.setItem('access_token', accessToken);
    }
    setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        this.steps_sub = 0;
      }
    }, 60000);
  },
};
</script>

<style scoped>
</style>
