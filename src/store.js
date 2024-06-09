import { createStore } from 'vuex';
import { db, doc, getDoc, setDoc } from "../firebase";

export default createStore({
  state: {
    coins: 10,
  },
  mutations: {
    updateCoins(state, newCoins) {
      state.coins = parseFloat(newCoins).toFixed(2);
    },
    setCoins(state, coins) {
      state.coins = coins;
    }
  },
  actions: {
    async fetchCoins({ commit }, userId) {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        commit('setCoins', userDoc.data().coins);
      }
    },
    async saveCoins({ state }, userId) {
      await setDoc(doc(db, "users", userId), { coins: state.coins });
    }
  },
});
