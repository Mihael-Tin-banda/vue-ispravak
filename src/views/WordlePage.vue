<template>
  <div class="wordle-game flex flex-col items-center justify-center mx-auto w-full md:w-3/4 lg:w-1/2" @keydown="handleKeydown" tabindex="0" ref="gameArea">
    <!-- Display remaining tries -->
    <div class="remaining-tries w-full bg-gray-200 rounded-full overflow-hidden">
      <div class="tries-bar bg-green-500 transition-width duration-300 ease-in-out" :style="{width: remainingTriesPercentage + '%'}"></div>
    </div>
    <div class="grid gap-1">
  <div v-for="n in maxGuesses" :key="n" class="flex justify-center">
    <div v-for="m in solution.length" :key="`guess-${n}-char-${m}`" class="w-8 h-8 border-2 border-gray-300 flex justify-center items-center">
      <span>{{ guesses[n-1] && guesses[n-1].chars[m-1] ? guesses[n-1].chars[m-1].char : '' }}</span>
    </div>
  </div>
</div>
    <div class="selected-letters flex gap-2">
      <span v-for="(letter, index) in selectedLetters" :key="index" class="selected-letter text-lg font-bold">{{ letter }}</span>
    </div>
    <div v-for="(guess, index) in guesses" :key="index" class="guess">
      <span v-for="(char, charIndex) in guess.chars" :key="charIndex" :class="charClass(char.class)">{{ char.char }}</span>
    </div>
    <div v-if="gameOver" class="game-over">
      <p>{{ gameStatusMessage }}</p>
      <button @click="resetGame" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Restart</button>
    </div>
    <div class="keyboard mt-4 fixed bottom-0 inset-x-0 px-2 sm:px-4">
    <div v-for="(row, rowIndex) in keyboardLayout" :key="rowIndex" class="keyboard-row flex justify-center mb-1 sm:mb-2">
      <button v-for="key in row" :key="key" :class="keyClass(key)" @click="addLetter(key)" class="keyboard-key bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 sm:py-2 sm:px-4 rounded mx-0.5 text-xs sm:text-sm md:text-base lg:text-lg">{{ key }}</button>
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
      // Other data properties remain unchanged
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
      possibleSolutions: [], // Add this to store the words from the file
    };
  },

  mounted() {
      this.fetchWords().then(() => {
          this.randomizeSolution(); // Randomize the solution after fetching words
          this.$nextTick(() => {
              this.focusGameArea();
              console.log('Game area focused'); // Debugging line to confirm focus
          });
      });
  },

  computed: {
    remainingTries() {
    return this.maxGuesses - this.guesses.length;
  },

  remainingTriesPercentage() {
    return (this.remainingTries / this.maxGuesses) * 100;
  },

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


    handleTouchStart(event, key) {
    event.preventDefault(); // Prevent the default touch behavior (like scrolling)
    this.addLetter(key); // Use the existing method to add a letter
  },

    blurFocus() {
      document.activeElement.blur(); // Remove focus from the input element
    },

    focusGameArea() {
  this.$refs.gameArea.focus(); // Focus the game area using a ref
  console.log('Focusing game area'); // Debugging line to confirm method call
},

  handleKeydown(event) {
    console.log(`Key pressed: ${event.key}`); // Debugging line to see if the event is captured
    const key = event.key.toLowerCase();
  if (key === 'enter') {
    this.submitGuess();
  } else if (key === 'backspace' && this.currentGuess.length > 0) {
    this.currentGuess = this.currentGuess.slice(0, -1);
    this.selectedLetters.pop();
  } else if (key.length === 1 && key >= 'a' && key <= 'z') {
    this.addLetter(key);
  }
},
submitGuess() {
    if (this.currentGuess.length === this.solution.length) {
      // Logic to check the guess and assign classes (correct, present, absent) remains the same
      const guessFeedback = this.currentGuess.split('').map((char, index) => {
        const feedbackClass = this.getCharClass(char, index);
        this.letterFeedback[char] = feedbackClass; // Update letter feedback
        return {
          char,
          class: feedbackClass,
        };
      });
      const isCorrect = this.currentGuess === this.solution;
      this.guesses.push({ chars: guessFeedback, isCorrect, isSubmitted: true });
      this.currentGuess = ''; // Reset current guess
      this.selectedLetters = []; // Clear selected letters after submitting a guess
    } else {
      alert('Guess must be ' + this.solution.length + ' letters.');
    }
  },
  
    getCharClass(char, index) {
      if (this.solution[index] === char) {
        return 'correct';
      } else if (this.solution.includes(char)) {
        return 'present';
      }
      return 'absent';
    },
    async fetchWords() {
      // Assuming words.txt content is imported as a string
      this.possibleSolutions = words.split('\n').map(word => word.trim()).filter(word => word.length);
    },
    randomizeSolution() {
  // Filter for 5-letter words before selecting a random solution
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
    this.randomizeSolution(); // Ensure a new word is selected on game reset
    this.focusGameArea(); // Focus the game area after reset
  },
    keyClass(key) {
    if (this.letterFeedback[key] === 'correct') {
      return 'correct-key';
    } else if (this.letterFeedback[key] === 'present') {
      return 'present-key';
    } else if (this.letterFeedback[key] === 'absent') {
      return 'absent-key';
    }
    return ''; // Default class if no feedback is available
  },
  addLetter(key) {
    if (key === '✅') {
      this.submitGuess();
    } else if (key === '❌') { // Handle Delete key
      if (this.currentGuess.length > 0) {
        this.currentGuess = this.currentGuess.slice(0, -1); // Remove the last character
        this.selectedLetters.pop(); // Remove the last selected letter
      }
    } else if (this.currentGuess.length < this.solution.length) {
      this.currentGuess += key; // Add the pressed key to the current guess
      this.selectedLetters.push(key); // Add the pressed key to the selected letters for visual feedback

      // Update the guesses array for display
      if (!this.guesses[this.guesses.length - 1] || this.guesses[this.guesses.length - 1].isSubmitted) {
        this.guesses.push({ chars: this.currentGuess.split('').map(char => ({ char, class: '' })), isSubmitted: false });
      } else {
        this.guesses[this.guesses.length - 1].chars = this.currentGuess.split('').map(char => ({ char, class: '' }));
      }
    }
    this.blurFocus(); // Remove focus from the input element
  },

    charClass(charClass) {
      return charClass;
    },
    }
  }
  </script>

<style scoped>
.correct {
  color: green;
}
.present {
  color: orange;
}
.absent {
  color: grey;
}

.correct-key {
  background-color: green !important;
}
.present-key {
  background-color: orange !important;
}
.absent-key {
  background-color: grey !important;
}

.selected-letter {
  margin-right: 5px;
  font-weight: bold;
}
.keyboard-row button {
  margin: 2px;
}

.remaining-tries {
  height: 20px;
  width: 100%;
  background-color: #eee;
  border-radius: 10px;
  margin: 20px 0;
}

.tries-bar {
  height: 100%;
  background-color: #4CAF50;
  border-radius: 10px;
  transition: width 0.3s ease;
}

.keyboard-key {
  min-width: 27px; /* Ensure buttons have a minimum width */
}
@media (min-width: 640px) { /* Tailwind's 'sm' breakpoint */
  .keyboard-key {
    min-width: 36px; /* Larger minimum width for larger screens */
  }
}
</style>