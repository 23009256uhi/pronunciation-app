<template>
  <div class="speech-container">
    <!-- Title -->
    <div class="chat-div">
      <h3 class="chat-header">Which word do you want to practice?</h3>
    </div>

    <!-- Input -->
    <div class="input-div">
      <input
        type="text"
        class="input"
        placeholder="Write your word here"
        v-model="inputValue"
        @keydown="handleKeyPress"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: `SpeechRecognitionComponent`,
  setup() {
    const inputValue = ref("");
    const router = useRouter();

    // Function to navigate to results page
    function navigateToResults() {
      if (inputValue.value) {
        router.push(`/search/${inputValue.value}`);
      }
    }

    // Event handler for Enter key press
    function handleKeyPress(event) {
      if (event.key === "Enter") {
        navigateToResults();
      }
    }

    // Return to be accessible in the template
    return {
      inputValue,
      handleKeyPress,
    };
  },
};
</script>

<style scoped>
.speech-container {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  justify-content: space-between;
  height: 100%;
  max-width: 768px;
  width: 100%;
  position: relative;
}

.chat-div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.input-div {
  display: flex;
  justify-content: center;
  flex-grow: 0;
  position: sticky;
  bottom: 0;
}

.input {
  width: 100%;
  padding: 1.6rem 2.8rem;
  font-size: 1.8rem;
  border-radius: 200px;
  border: 1px solid black;
  background-color: var(--input-cl);
  color: var(--text-cl);
}

.input:focus {
  outline: none;
}

@media (max-width: 490px) {
  .chat-header {
    text-align: center;
  }
}
</style>
