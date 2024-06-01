import { createStore } from 'vuex';

export default createStore({
  state: {
    coins: 10,
  },
  mutations: {
    updateCoins(state, newCoins) {
      state.coins = parseFloat(newCoins).toFixed(2);
    },
  },
});