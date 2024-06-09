<template>
  <div class="login-container">
    <h1>Login</h1>
    <button @click="authenticate">Login with Google</button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { auth, provider, signInWithPopup } from '../services/firebase';

export default {
  name: 'LoginPage',  // Promijenite naziv komponente
  methods: {
    ...mapActions(['fetchCoins']),
    ...mapMutations(['setUser', 'setCoins']),
    
    async authenticate() {
      try {
        const result = await signInWithPopup(auth, provider);
        const userId = result.user.uid;
        this.setUser({ id: userId, name: result.user.displayName });
        await this.fetchCoins(userId);
        this.$router.push('/');
      } catch (error) {
        console.error("Authentication failed:", error);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
