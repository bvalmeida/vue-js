<template>
  <div>
    <template v-if="this.question">
      <template v-if="this.pcPoints >= 1 || this.playerPoints >=1">
        <p>Pc {{ this.pcPoints }} x Player {{ this.playerPoints }}</p>
        <p>__________________________________________________________________________________________________________________</p>
      </template>

      <h1 v-html="this.question"></h1>

      <template v-for="(answer, index) in this.answers" :key="index">
        <input
          :disabled="this.answerSubmitted"
          type="radio"
          name="options"
          :value="answer"
          v-model="this.chosenAnswer"
        />
        <label v-html="answer"></label><br />
      </template>

      <button
        class="send"
        type="button"
        @click="this.submitAnswer()"
        v-if="!this.answerSubmitted"
      >
        {{ this.buttonText }}
      </button>

      <section v-if="this.answerSubmitted" class="result">
        <h4 v-if="this.chosenAnswer == this.correctAnswer"
        v-html="'&#9989; Congratulations, the answer ' + this.correctAnswer + ' is correct'">
        </h4>
        <h4 v-else
        v-html="'&#10060; Im sorry, you picked the wrong answer. The correct is ' + this.correctAnswer">
        </h4>
        <button class="send" type="button" @click="this.newQuestion()">
          Next Question
        </button>
      </section>

      <h4>{{ this.messageCorrectOrNot }}</h4>
    </template>
  </div>
</template>

<script>
const urlApi =
  "https://opentdb.com/api.php?amount=1&category=18&difficulty=hard";

export default {
  name: "App",
  data() {
    return {
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswer: undefined,
      chosenAnswer: undefined,
      pcPoints: 0,
      playerPoints: 0,
      answerSubmitted: false,
      buttonText: "Send",
    };
  },
  computed: {
    answers() {
      var answers = JSON.parse(JSON.stringify(this.incorrectAnswers));
      answers.splice(
        Math.round(Math.random() * answers.length),
        0,
        this.correctAnswer
      );
      return answers;
    },
  },
  methods: {
    submitAnswer() {
      this.validateAnswer();
    },

    newQuestion() {
      this.axios.get(urlApi).then((response) => {
        console.log(response.data.results[0]);
        this.question = response.data.results[0].question;
        this.incorrectAnswers = response.data.results[0].incorrect_answers;
        this.correctAnswer = response.data.results[0].correct_answer;
        this.answerSubmitted = false;
        this.chosenAnswer = undefined;
      });
    },

    validateAnswer() {
      if (!this.chosenAnswer) {
        console.log("Pick one of the options");
      } else {
        this.answerSubmitted = true;
        if (this.chosenAnswer === this.correctAnswer) {
          console.log("You got it right");
          this.playerPoints += 1;
        } else {
          console.log("You got it wrong");
          this.pcPoints += 1;
        }
      }
    },
  },
  created() {
    this.newQuestion();
  },
};

//https://opentdb.com/api.php?amount=1&category=18&difficulty=hard
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

  input[type="radio"] {
    margin: 12px 4px;
  }

  button.send {
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: #1867c0;
    border: 1px solid #1867c0;
    cursor: pointer;
  }
}
</style>
