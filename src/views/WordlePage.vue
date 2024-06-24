<template>
  <div class="flex flex-col md:flex-row justify-between items-center relative mt-2">
    <router-link to="/" class="border-color border-2 p-2 border-dashed mb-2 md:mb-0 md:ml-2 hover:bg-red-500">Go back</router-link>

    <div class="flex flex-col md:flex-row items-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 space-y-2 md:space-y-0 md:space-x-2">
      <p id="multiply" class="border-color border-2 p-2 border-dashed">Multiply: {{ multiply.toFixed(1) }}</p>
      <input type="number" id="betInput" min="0.1" step="0.1" v-model="betValue" class="focus:outline-0 border-2 border-dashed text-center bg-color text-color p-2" :disabled="gameActive">
      <button id="placeBetButton" class="border-color border-2 p-2 border-dashed hover:bg-red-500" @click="placeBet" v-if="!gameActive">Place Bet</button>
    </div>

    <p id="coinDisplay" class="border-color border-2 p-2 border-dashed mt-2 md:mt-0">Coins: {{ coins }} KK</p>
  </div>
  <div class="wordle-game flex flex-col items-center justify-center mx-auto w-full md:w-3/4 lg:w-1/2" @keydown="handleKeydown" tabindex="0" ref="gameArea">
    <div class="grid gap-1 mb-4">
      <div v-for="n in maxGuesses" :key="n" class="flex justify-center">
        <div v-for="m in solution.length" :key="`guess-${n}-char-${m}`" class="w-12 h-12 sm:w-14 sm:h-14 border-2 flex justify-center items-center m-0.5 text-lg sm:text-xl" :class="getCellClass(n-1, m-1)">
          <span>{{ getChar(n-1, m-1) }}</span>
        </div>
      </div>
    </div>

    <div v-if="gameOver" class="game-over mb-4">
      <p>{{ gameStatusMessage }}</p>
      <button @click="resetGame" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Restart</button>
    </div>

    <div class="keyboard mt-4 mb-4">
      <div v-for="(row, rowIndex) in keyboardLayout" :key="rowIndex" class="keyboard-row flex justify-center mb-1 sm:mb-2">
        <button v-for="key in row" :key="key" :class="keyClass(key)" @click="addLetter(key)" class="keyboard-key bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 sm:py-3 sm:px-3 rounded mx-0.5 text-base sm:text-lg">{{ key }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, nextTick } from 'vue';
import { useStore } from 'vuex';
import words from '@/assets/words.txt';
import { auth, db, doc, setDoc } from '../firebase';

export default {
  name: 'WordlePage',
  setup() {
    const store = useStore();
    const coins = computed(() => store.state.coins);
    const betValue = ref(1);
    const gameActive = ref(false);
    const multiply = ref(0.4);
    const currentBet = ref(0);
    const solution = ref('');
    const guesses = ref([]);
    const currentGuess = ref('');
    const maxGuesses = ref(6);
    const keyboardLayout = ref([
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['❌', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '✅']
    ]);
    const letterFeedback = ref({});
    const selectedLetters = ref([]);
    const possibleSolutions = ref([]);
    const gameArea = ref(null);

    const gameOver = computed(() => guesses.value.length >= maxGuesses.value || guesses.value.some(guess => guess.isCorrect));
    const gameStatusMessage = computed(() => {
      if (guesses.value.some(guess => guess.isCorrect)) {
        return 'Congratulations! You won!';
      } else if (guesses.value.length >= maxGuesses.value) {
        return `Game Over! The word was ${solution.value}.`;
      }
      return '';
    });

    const fetchWords = async () => {
      possibleSolutions.value = words.split('\n').map(word => word.trim()).filter(word => word.length);
    };

    const randomizeSolution = () => {
      const fiveLetterWords = possibleSolutions.value.filter(word => word.length === 5);
      if (fiveLetterWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
        solution.value = fiveLetterWords[randomIndex];
      }
    };

    const placeBet = async () => {
      if (betValue.value > coins.value) {
        alert("You don't have enough coins to place this bet.");
        return;
      }
      currentBet.value = betValue.value;
      await updateUserCoins(coins.value - betValue.value);
      gameActive.value = true;
      nextTick(() => {
        focusGameArea();
      });
    };

    const updateUserCoins = async (newCoins) => {
      store.commit('updateCoins', parseFloat(newCoins).toFixed(2));
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { coins: parseFloat(newCoins) }, { merge: true });
      }
    };

    const resetGame = async () => {
      guesses.value = [];
      currentGuess.value = '';
      letterFeedback.value = {};
      randomizeSolution();
      gameActive.value = false;
      currentBet.value = 0;
      multiply.value = 0.4;
      await nextTick();
      focusGameArea();
    };

    const handleKeydown = (event) => {
      if (!gameActive.value) return;
      const key = event.key.toLowerCase();
      if (key === 'enter') {
        if (currentGuess.value && (!guesses.value.length || !guesses.value[guesses.value.length - 1].isSubmitted)) {
          submitGuess();
        }
      } else if (key === 'backspace' && currentGuess.value.length > 0) {
        currentGuess.value = currentGuess.value.slice(0, -1);
        selectedLetters.value.pop();
        if (guesses.value.length && !guesses.value[guesses.value.length - 1].isSubmitted) {
          guesses.value[guesses.value.length - 1].chars.pop();
        }
      } else if (key.length === 1 && key >= 'a' && key <= 'z') {
        addLetter(key);
      }
      maintainFocus();
    };

    const maintainFocus = () => {
      if (gameArea.value) {
        gameArea.value.focus();
      }
    };

    const submitGuess = async () => {
      if (currentGuess.value.length === solution.value.length) {
        const isWordValid = possibleSolutions.value.includes(currentGuess.value);
        if (isWordValid) {
          const guessFeedback = currentGuess.value.split('').map((char, index) => {
            const feedbackClass = getCharClass(char, index);
            if (feedbackClass === 'correct' && !(letterFeedback.value[char] === 'correct')) {
              multiply.value += 0.2;
            }
            letterFeedback.value[char] = feedbackClass;
            return { char, class: feedbackClass };
          });
          const isCorrect = currentGuess.value === solution.value;
          guesses.value.push({ chars: guessFeedback, isCorrect, isSubmitted: true });
          currentGuess.value = '';
          if (gameOver.value) {
            const winnings = currentBet.value * multiply.value;
            await updateUserCoins(parseFloat(coins.value) + winnings);
          }
          selectedLetters.value = [];
        } else {
          alert('Invalid word');
        }
      } else {
        alert('Guess must be ' + solution.value.length + ' letters.');
      }
    };

    const getCharClass = (char, index) => {
      if (solution.value[index] === char) return 'correct';
      if (solution.value.includes(char)) return 'present';
      return 'absent';
    };

    const keyClass = (key) => {
      if (letterFeedback.value[key] === 'correct') return 'correct-key';
      if (letterFeedback.value[key] === 'present') return 'present-key';
      if (letterFeedback.value[key] === 'absent') return 'absent-key';
      return '';
    };

    const addLetter = (key) => {
      if (!gameActive.value) return;
      if (key === '✅') {
        submitGuess();
      } else if (key === '❌') {
        if (currentGuess.value.length > 0) {
          currentGuess.value = currentGuess.value.slice(0, -1);
          selectedLetters.value.pop();
        }
      } else if (currentGuess.value.length < solution.value.length) {
        currentGuess.value += key;
        selectedLetters.value.push(key);
      }
      blurFocus();
    };

    const getCellClass = (row, col) => {
      if (guesses.value[row] && guesses.value[row].chars[col]) {
        return guesses.value[row].chars[col].class;
      }
      if (row === guesses.value.length && currentGuess.value[col]) {
        return 'current';
      }
      return '';
    };

    const getChar = (row, col) => {
      if (row === guesses.value.length && currentGuess.value[col]) {
        return currentGuess.value[col];
      }
      if (guesses.value[row] && guesses.value[row].chars[col]) {
        return guesses.value[row].chars[col].char;
      }
      return '';
    };

    const focusGameArea = () => {
      if (gameArea.value) {
        gameArea.value.focus();
      }
    };

    const blurFocus = () => {
      document.activeElement.blur();
    };

    onMounted(() => {
      fetchWords().then(() => {
        randomizeSolution();
        nextTick(() => {
          focusGameArea();
        });
      });
    });

    return {
      coins,
      betValue,
      gameActive,
      multiply,
      currentBet,
      solution,
      guesses,
      currentGuess,
      maxGuesses,
      keyboardLayout,
      letterFeedback,
      selectedLetters,
      possibleSolutions,
      gameArea,
      gameOver,
      gameStatusMessage,
      handleKeydown,
      maintainFocus,
      submitGuess,
      getCharClass,
      addLetter,
      keyClass,
      getCellClass,
      getChar,
      focusGameArea,
      blurFocus,
      placeBet,
      resetGame
    };
  }
};
</script>

<style scoped>
.wordle-game:focus {
  outline: none;
}

.correct { background-color: green; color: white; }
.present { background-color: orange; color: white; }
.absent { background-color: grey; color: white; }
.current { background-color: transparent; color: white; }

.correct-key { background-color: green !important; }
.present-key { background-color: orange !important; }
.absent-key { background-color: grey !important; }

.selected-letter { margin-right: 5px; font-weight: bold; }
.keyboard-row button { margin: 2px; }

.keyboard-key { min-width: 30px; }
@media (min-width: 640px) {
  .keyboard-key { min-width: 54px; }
}

.keyboard {
  margin-top: 1rem; /* Adjust this value to set the distance between the keyboard and the game area */
}
</style>
