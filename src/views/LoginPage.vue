<template>
  <div class="login">
    <h1>Login</h1>
    <button @click="authenticate">Sign in with Google</button>
  </div>
</template>

<script>
import { auth, provider, signInWithPopup } from '../firebase';

export default {
  name: 'LoginPage',
  methods: {
    async authenticate() {
      try {
        await signInWithPopup(auth, provider);
        this.$router.push('/');
      } catch (error) {
        console.error('Error during authentication', error);
      }
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
