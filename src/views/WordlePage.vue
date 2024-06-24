<template>
  <div class="flex flex-col md:flex-row justify-between items-center relative mt-2">
      <router-link to="/" class="border-color border-2 p-2 border-dashed mb-2 md:mb-0 md:ml-2 hover:bg-red-500">Go back</router-link>

      <div class="flex flex-col md:flex-row items-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 space-y-2 md:space-y-0 md:space-x-2">
        <p id="multiply" class="border-color border-2 p-2 border-dashed">Multiply: {{ multiply.toFixed(1) }}</p>

        <input type="number" id="betInput" min="0.1" step="0.1" v-model="betValue" class="focus:outline-0 border-2 border-dashed text-center bg-color text-color p-2">

        <button id="placeBetButton" class="border-color border-2 p-2 border-dashed hover:bg-red-500" @click="placeBet" v-if="!gameActive">Place Bet</button>
        <button id="withdrawButton" class="border-color border-2 p-2 border-dashed hover:bg-red-500" v-if="gameActive" @click="withdraw">Withdraw</button>
      </div>

      <p id="coinDisplay" class="border-color border-2 p-2 border-dashed mt-2 md:mt-0">Coins: {{ coins }} KK</p>
    </div>
  <div class="wordle-game flex flex-col items-center justify-center mx-auto w-full md:w-3/4 lg:w-1/2" @keydown="handleKeydown" @keyup="maintainFocus" tabindex="0" ref="gameArea">
    <div class="grid gap-1 mb-4" @click="focusGameArea">
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

    <div class="keyboard mt-4 fixed bottom-0 inset-x-0 px-1 sm:px-2">
      <div v-for="(row, rowIndex) in keyboardLayout" :key="rowIndex" class="keyboard-row flex justify-center mb-1 sm:mb-2">
        <button v-for="key in row" :key="key" :class="keyClass(key)" @click="addLetter(key)" class="keyboard-key bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 sm:py-3 sm:px-3 rounded mx-0.5 text-base sm:text-lg">{{ key }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import words from '@/assets/words.txt';

export default {
  name: 'WordlePage',
  data() {
    return {
      solution: '',
      guesses: [],
      currentGuess: '',
      maxGuesses: 6,
      keyboardLayout: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['❌', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '✅']
      ],
      letterFeedback: {},
      selectedLetters: [],
      possibleSolutions: [],
    };
  },
  mounted() {
    this.fetchWords().then(() => {
      this.randomizeSolution();
      this.$nextTick(this.focusGameArea);
    });
  },
  computed: {
    gameOver() {
      return this.guesses.length >= this.maxGuesses || this.guesses.some(guess => guess.isCorrect);
    },
    gameStatusMessage() {
      if (this.guesses.some(guess => guess.isCorrect)) {
        return 'Congratulations! You won!';
      } else if (this.guesses.length >= this.maxGuesses) {
        return `Game Over! The word was ${this.solution}.`;
      }
      return '';
    },
  },
  methods: {
    handleKeydown(event) {
      const key = event.key.toLowerCase();
      if (key === 'enter') {
        if (this.currentGuess && (!this.guesses.length || !this.guesses[this.guesses.length - 1].isSubmitted)) {
          this.submitGuess();
        }
      } else if (key === 'backspace' && this.currentGuess.length > 0) {
        this.currentGuess = this.currentGuess.slice(0, -1);
        this.selectedLetters.pop();
        if (this.guesses.length && !this.guesses[this.guesses.length - 1].isSubmitted) {
          this.guesses[this.guesses.length - 1].chars.pop();
        }
      } else if (key.length === 1 && key >= 'a' && key <= 'z') {
        this.addLetter(key);
      }
      this.maintainFocus();
    },
    maintainFocus() {
      this.$refs.gameArea.focus();
    },
    submitGuess() {
      if (this.currentGuess.length === this.solution.length) {
        const guessFeedback = this.currentGuess.split('').map((char, index) => {
          const feedbackClass = this.getCharClass(char, index);
          this.letterFeedback[char] = feedbackClass;
          return { char, class: feedbackClass };
        });
        const isCorrect = this.currentGuess === this.solution;
        this.guesses.push({ chars: guessFeedback, isCorrect, isSubmitted: true });
        this.currentGuess = '';
        this.selectedLetters = [];
      } else {
        alert('Guess must be ' + this.solution.length + ' letters.');
      }
    },
    getCharClass(char, index) {
      if (this.solution[index] === char) return 'correct';
      if (this.solution.includes(char)) return 'present';
      return 'absent';
    },
    async fetchWords() {
      this.possibleSolutions = words.split('\n').map(word => word.trim()).filter(word => word.length);
    },
    randomizeSolution() {
      const fiveLetterWords = this.possibleSolutions.filter(word => word.length === 5);
      if (fiveLetterWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
        this.solution = fiveLetterWords[randomIndex];
      }
    },
    resetGame() {
      this.guesses = [];
      this.currentGuess = '';
      this.letterFeedback = {};
      this.randomizeSolution();
      this.focusGameArea();
    },
    keyClass(key) {
      if (this.letterFeedback[key] === 'correct') return 'correct-key';
      if (this.letterFeedback[key] === 'present') return 'present-key';
      if (this.letterFeedback[key] === 'absent') return 'absent-key';
      return '';
    },
    addLetter(key) {
      if (key === '✅') {
        this.submitGuess();
      } else if (key === '❌') {
        if (this.currentGuess.length > 0) {
          this.currentGuess = this.currentGuess.slice(0, -1);
          this.selectedLetters.pop();
        }
      } else if (this.currentGuess.length < this.solution.length) {
        this.currentGuess += key;
        this.selectedLetters.push(key);
      }
      this.blurFocus();
    },
    getCellClass(row, col) {
      if (this.guesses[row] && this.guesses[row].chars[col]) {
        return this.guesses[row].chars[col].class;
      }
      if (row === this.guesses.length && this.currentGuess[col]) {
        return 'current';
      }
      return '';
    },
    getChar(row, col) {
      if (row === this.guesses.length && this.currentGuess[col]) {
        return this.currentGuess[col];
      }
      if (this.guesses[row] && this.guesses[row].chars[col]) {
        return this.guesses[row].chars[col].char;
      }
      return '';
    },
    focusGameArea() {
      this.$refs.gameArea.focus();
    },
    blurFocus() {
      document.activeElement.blur();
    }
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

.keyboard-key { min-width: 42px; } /* Increased the size for better touch interaction */
@media (min-width: 640px) {
  .keyboard-key { min-width: 54px; }
}
</style>
