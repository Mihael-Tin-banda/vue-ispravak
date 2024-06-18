<template>
  <div>
    <button @click="authenticate">Authenticate</button>
  </div>
</template>

<script>
import { auth, provider, signInWithPopup, db, doc, getDoc, setDoc } from '../firebase';
import { mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      userId: null,
    };
  },
  methods: {
    ...mapActions(['fetchCoins']),
    ...mapMutations(['setUser', 'setCoins']),
    
    async authenticate() {
      try {
        const result = await signInWithPopup(auth, provider);
        this.userId = result.user.uid;
        this.setUser({ id: this.userId, name: result.user.displayName });
        await this.fetchCoins(this.userId);
        const userDoc = await getDoc(doc(db, 'users', this.userId));
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', this.userId), { coins: 10 });
          this.setCoins(10);
        }
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    },
  },
};
</script>

<style scoped>
</style>
