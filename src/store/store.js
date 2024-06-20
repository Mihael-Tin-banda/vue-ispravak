import { createStore } from 'vuex';
import { auth, db, doc, getDoc } from '../firebase';

export default createStore({
  state: {
    coins: 10,
  },
  mutations: {
    updateCoins(state, newCoins) {
      state.coins = parseFloat(newCoins).toFixed(2);
    },
  },
  actions: {
    async fetchCoins({ commit }) {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          commit('updateCoins', userDoc.data().coins || 0);
        }
      }
    },
  },
  getters: {
    getCoins(state) {
      return state.coins;
    },
  },
});
