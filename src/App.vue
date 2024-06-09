<template>
  <router-view />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'App',
  setup() {
    const store = useStore();

    const coins = computed(() => store.state.coins);
    const user = computed(() => store.state.user);
    const updateUserCoins = (newCoins) => {
      store.commit('updateCoins', newCoins);
    };

    return {
      coins,
      user,
      updateUserCoins,
    };
  },
};
</script>

<style>
</style>
