import { createStore } from 'vuex';
import { db, doc, getDoc, setDoc } from "../services/firebase";

export default createStore({
  state: {
    coins: 10,
    user: null,
  },
  mutations: {
    updateCoins(state, newCoins) {
      state.coins = parseFloat(newCoins).toFixed(2);
    },
    setCoins(state, coins) {
      state.coins = coins;
    },
    setUser(state, user) {
      state.user = user;
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
