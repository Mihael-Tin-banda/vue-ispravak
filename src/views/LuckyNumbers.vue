<template>
  <div class="bg-color">
    <div class="flex md:flex-row flex-col justify-between items-center relative mt-2">
      <router-link to="/" class="border-color border-2 p-2 border-dashed ml-2 hover:bg-red-500">Go back</router-link>
      <div class="flex flex-col md:flex-row md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
        <input type="number" v-model="betAmount" min="0.1" step="0.1" class="focus:outline-0 md:border-t-2 md:border-b-2  md:border-r-0 border-l-2 border-r-2 border-dashed text-color bg-color text-center">
        <button @click="placeBet" class="border-color border-2 p-2 border-dashed hover:bg-red-500">Place Bet</button>
      </div>
      <p class="border-color border-2 p-2 border-dashed">Coins: {{ coinDisplay }} KK</p>
    </div>
    <div class="flex flex-col justify-center items-center my-8" v-if="betPlaced">
      <p class="text-center text-color font-black">{{ randomNumbersText }}</p>
      <p class="text-center text-color font-black">{{ correctGuessesText }}</p>
      <p class="text-center text-color font-black">{{ resultText }}</p>
    </div>

    <div v-if="waitingForRestart" class="timer">
    Game restarts in: {{ timer }} seconds
  </div>
    <div class="flex justify-center items-center mt-10">
      <div id="grid" class="flex flex-wrap" style="width: 26rem;">
        <div v-for="number in numbers" :key="number" class="number h-16 w-16 border-2 border-dashed border-color hover:bg-red-800 m-0.5 flex justify-center items-center font-bold" @click="selectNumber(number)" :class="{ 'bg-red-500': selectedNumbers.includes(number) }">
          {{ number }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'LuckyNumbers',
  setup() {
    const store = useStore();
    const betAmount = ref(1.0);
    const selectedNumbers = ref([]);
    const numbers = ref(Array.from({ length: 36 }, (_, i) => i + 1));
    const randomNumbers = ref([]);
    const correctGuesses = ref(0);
    const winnings = ref(0);
    const betPlaced = ref(false); // New property to track if a bet has been placed
    const timer = ref(0); // Timer countdown
    const waitingForRestart = ref(false); // Flag to indicate if the game is in the waiting period

    const coinDisplay = computed(() => {
      const coins = parseFloat(store.state.coins);
      return isNaN(coins) ? '0.00' : coins.toFixed(2);
    });

    function startTimer(duration) {
  timer.value = duration;
  waitingForRestart.value = true;
  const interval = setInterval(() => {
    timer.value--;
    if (timer.value <= 0) {
      clearInterval(interval);
      // Reset game state here (e.g., clear selected numbers, reset winnings, etc.)
      selectedNumbers.value = [];
      winnings.value = 0;
      betPlaced.value = false;
      waitingForRestart.value = false;
    }
  }, 1000);
}

    const updateUserCoins = (newCoins) => {
      return new Promise(resolve => {
        store.commit('updateCoins', newCoins);
        resolve(newCoins); // Return the updated coins value
      });
    };

    function selectNumber(number) {
      const index = selectedNumbers.value.indexOf(number);
      if (index > -1) {
        selectedNumbers.value.splice(index, 1);
      } else if (selectedNumbers.value.length < 5) {
        selectedNumbers.value.push(number);
      }
    }

    async function placeBet() {
        if (waitingForRestart.value) {
    return;
  }

      if (selectedNumbers.value.length < 5) {
        alert("Please select all 5 numbers before placing a bet.");
        return;
      }
      const bet = parseFloat(betAmount.value);
      if (bet < 0) {
        return;
      }
      if (bet > store.state.coins) {
        alert("You don't have enough coins to place this bet.");
        return;
      }
      // Deduct the bet amount and wait for the update to complete
      const updatedCoinsAfterBet = await updateUserCoins(store.state.coins - bet);
      // Ensure the state is updated before calculating winnings
      const gameWinnings = playGame(bet);
      // Then add the winnings to the updated coin amount
      await updateUserCoins(updatedCoinsAfterBet + gameWinnings);
      winnings.value = gameWinnings; // Update winnings
      betPlaced.value = true; // Update betPlaced to true after a successful bet
      startTimer(5); // Start the timer countdown
    }

    function playGame(currentBet) {
      let generatedNumbers = [];
      for (let i = 0; i < 5; i++) {
        let randomNumber;
        do {
          randomNumber = Math.floor(Math.random() * 36) + 1;
        } while (generatedNumbers.includes(randomNumber));
        generatedNumbers.push(randomNumber);
      }
      randomNumbers.value = generatedNumbers; // Update random numbers

      let matches = selectedNumbers.value.filter(n => generatedNumbers.includes(n)).length;
      correctGuesses.value = matches; // Update correct guesses

      let multiplier = [0, 1.1, 2.4, 5, 10, 50][matches];
      return currentBet * multiplier;
    }

    return {
      betAmount,
      selectedNumbers,
      numbers,
      coinDisplay,
      selectNumber,
      placeBet,
      betPlaced,
      randomNumbersText: computed(() => `Random numbers: ${randomNumbers.value.join(', ')}`),
      correctGuessesText: computed(() => `You got ${correctGuesses.value} correct guesses`),
      resultText: computed(() => `You won: ${winnings.value.toFixed(2)} KK`),
    };
  },
};
</script>

<style scoped>
/* Your CSS here */
</style>