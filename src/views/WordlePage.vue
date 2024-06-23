<template>
  <div class="wordle-game" @keydown="handleKeydown" tabindex="0" ref="gameArea">
    <div class="current-guess">
      {{ currentGuess }} <!-- Display the current guess -->
    </div>
    <div class="selected-letters">
      <span v-for="(letter, index) in selectedLetters" :key="index" class="selected-letter">{{ letter }}</span>
    </div>
    <div v-for="(guess, index) in guesses" :key="index" class="guess">
      <span v-for="(char, charIndex) in guess.chars" :key="charIndex" :class="char.class">{{ char.char }}</span>
    </div>
    <div v-if="gameOver" class="game-over">
      <p>{{ gameStatusMessage }}</p>
      <button @click="resetGame">Restart</button>
    </div>
    <div class="keyboard">
      <div v-for="(row, rowIndex) in keyboardLayout" :key="rowIndex" class="keyboard-row">
        <button v-for="key in row" :key="key" :class="keyClass(key)" @click="addLetter(key)">{{ key }}</button>
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
      if (this.currentGuess.length !== this.solution.length) {
        alert('Guess must be 5 letters.');
        return;
      }
      const guessFeedback = this.currentGuess.split('').map((char, index) => {
        const feedbackClass = this.getCharClass(char, index);
        this.letterFeedback[char] = feedbackClass; // Update letter feedback
        return {
          char,
          class: feedbackClass,
        };
      });
      const isCorrect = this.currentGuess === this.solution;
      this.guesses.push({ chars: guessFeedback, isCorrect });
      this.currentGuess = '';
      this.selectedLetters = []; // Clear selected letters after submitting a guess
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
      return this.letterFeedback[key]; // Return the class based on feedback
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
        this.currentGuess += key;
        this.selectedLetters.push(key);
      }
      this.blurFocus(); // Remove focus from the input element
    },
  },
};
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
.selected-letter {
  margin-right: 5px;
  font-weight: bold;
}
.keyboard-row button {
  margin: 2px;
}
</style>