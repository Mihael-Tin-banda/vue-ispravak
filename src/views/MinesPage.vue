<template>
  <div>
    <div class="flex md:flex-row flex-col justify-between items-center relative mt-2">
      <router-link to="/" class="border-color border-2 p-2 border-dashed ml-2 hover:bg-red-500">Go back</router-link>

      <div class="flex flex-col md:flex-row md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
        <p id="multiply" class="border-color border-2 p-2 border-dashed">Multiply: {{ multiply.toFixed(1) }}</p>

        <input type="number" id="betInput" min="0.1" step="0.1" v-model="betValue" class="focus:outline-0 md:border-t-2 md:border-b-2 md:border-l-0 md:border-r-0 border-l-2 border-r-2 border-dashed text-color bg-color text-center">

        <button id="placeBetButton" class="border-color border-2 p-2 border-dashed hover:bg-red-500" @click="placeBet" v-if="!gameActive">Place Bet</button>
        <button id="withdrawButton" class="border-color border-2 p-2 border-dashed hover:bg-red-500" v-if="gameActive" @click="withdraw">Withdraw</button>
      </div>

      <p id="coinDisplay" class="border-color border-2 p-2 border-dashed">{{ coins }}</p>
    </div>

    <div class="flex justify-center items-center mt-12">
      <div id="minefield" class="flex flex-wrap" style="width: 26rem;">
        <div v-for="(mine, index) in mines" :key="index" class="h-16 w-16 border-2 border-dashed border-color hover:bg-red-800 m-0.5" @click="clickSquare(index)"></div>
      </div>
    </div>

    <div class="flex justify-center items-center mt-12">
      <p id="timer" class="border-color border-2 p-2 border-dashed" v-if="gameActive">Time remaining: {{ timeRemaining }}s</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { auth, db, doc, setDoc } from '../firebase';

export default {
  name: 'MinesPage',
  setup() {
    const store = useStore();
    const coins = ref(store.state.coins);
    const betValue = ref(1);
    const gameActive = ref(false);
    const currentBet = ref(0);
    const multiply = ref(1.0);
    const scoreIncrement = ref(0.2);
    const timeRemaining = ref(30);
    const mines = ref(Array(36).fill(false));

    const updateUserCoins = async (newCoins) => {
      coins.value = parseFloat(newCoins).toFixed(2);
      store.commit('updateCoins', coins.value);

      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { coins: parseFloat(newCoins) }, { merge: true });
      }
    };

    watch(gameActive, (newVal) => {
      if (newVal) {
        startTimer();
      } else {
        stopTimer();
      }
    });

    onMounted(initGame);

    function startTimer() {
      timeRemaining.value = 30;
      const interval = setInterval(() => {
        timeRemaining.value--;
        if (timeRemaining.value <= 0) {
          alert("Time's up!");
          gameActive.value = false;
          clearInterval(interval);
        }
      }, 1000);
    }

    function stopTimer() {
      timeRemaining.value = 30;
    }

    function placeBet() {
      if (betValue.value > coins.value) {
        alert("You don't have enough coins to place this bet.");
        return;
      }
      currentBet.value = betValue.value;
      updateUserCoins(coins.value - betValue.value);
      gameActive.value = true;
    }

    function withdraw() {
      if (multiply.value === 1.0) {
        updateUserCoins(coins.value);
      } else {
        updateUserCoins(coins.value + currentBet.value * multiply.value);
      }
      gameActive.value = false;
      currentBet.value = 0;
    }

    function clickSquare(index) {
      if (!gameActive.value) {
        return;
      }
      if (mines.value[index]) {
        alert("Game Over");
        gameActive.value = false;
      } else {
        multiply.value += scoreIncrement.value;
        scoreIncrement.value += 0.2;
      }
    }

    function initGame() {
      multiply.value = 1.0;
      scoreIncrement.value = 0.1;
      for (let i = 0; i < 10; i++) {
        let index;
        do {
          index = Math.floor(Math.random() * 36);
        } while (mines.value[index]);
        mines.value[index] = true;
      }
    }

    return {
      betValue,
      gameActive,
      coins,
      multiply,
      timeRemaining,
      mines,
      placeBet,
      withdraw,
      clickSquare,
    };
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
