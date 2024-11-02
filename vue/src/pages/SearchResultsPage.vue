<template>
  <div class="results-div">
    <div v-if="wordData">
      <div v-for="(word, wordIndex) in wordData" :key="wordIndex">
        <div class="word-button">
          <h3 class="word-header">
            {{ word.word }}
          </h3>
          <button
            @click="handlePracticeClick(word.word, word.phonetic)"
            class="btn"
          >
            Practice this word
          </button>
        </div>
        <span class="phonetic">{{ word.phonetic }}</span>

        <div
          v-for="(meaning, meaningIndex) in word.meanings"
          :key="meaningIndex"
          class="definitions"
        >
          <h4 class="part-of-speech">{{ meaning.partOfSpeech }}</h4>

          <div
            v-for="(definition, definitionIndex) in meaning.definitions"
            :key="definitionIndex"
            class="definition-div"
          >
            <span class="index-span">{{ definitionIndex + 1 }}</span>
            <p class="definition">{{ definition.definition }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "SearchResultsPage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const word = route.params.word;
    const wordData = ref(null);

    // Fetch data based on the route parameter
    async function fetchWordData() {
      try {
        const response = await axios.post("http://localhost:5000/fetchword", {
          userInput: word,
        });
        wordData.value = response.data;
      } catch (error) {
        console.error("Error fetching word data:", error);
        wordData.value = null;
      }
    }

    // Navigate to the practice page
    function handlePracticeClick(word, phonetic) {
      router.push({ path: "/practice", query: { word, phonetic } });
    }

    // Fetch the word data when the component is mounted
    onMounted(() => {
      fetchWordData();
    });

    return {
      wordData,
      handlePracticeClick,
    };
  },
};
</script>

<style scoped>
span {
  color: var(--text-cl);
}

.results-div {
  padding: var(--content-pd);
  /* width: 768px; */
}

.word-button {
  display: flex;
  gap: 1.6rem;
}

.word-header {
  font-size: 6rem;
}

.btn {
  background-color: var(--btn-cl);
  color: var(--text-cl);
}

.btn:hover {
  background-color: var(--hover-btn-cl);
  outline: none;
}

.phonetic {
  font-size: 2.6rem;
}

.definitions {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin-bottom: 3rem;
}

.part-of-speech {
  font-size: 3rem;
  margin-bottom: 0.8rem;
  font-style: italic;
}

.definition-div {
  display: flex;
  gap: 0.8rem;
}

.index-span {
  max-width: 2.8rem;
  width: 100%;
  font-size: 1.8rem;
}

.definition {
  font-size: 1.8rem;
}
</style>
