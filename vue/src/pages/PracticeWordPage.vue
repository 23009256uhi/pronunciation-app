<template>
  <div class="practice-div">
    <div v-if="word && phonetic" class="speech-container">
      <h1 class="word-title">
        Let's practice how to say: <span class="word">{{ word }}</span>
      </h1>
      <p class="phonetic">
        Phonetic transcription: <strong>{{ phonetic }}</strong>
      </p>
      <p class="instructions">
        <strong>Instructions:</strong>Read the instructions below, and when
        ready, <span class="highlight">press the button</span> to start
        recording and <span class="highlight">pronounce the word aloud</span>.
      </p>
      <p class="instruction-details">{{ instructions }}</p>

      <button
        :class="isRecording ? 'recording-button' : 'try-button'"
        @click="isRecording ? stopRecording() : startRecording()"
      >
        {{ isRecording ? "Stop Recording" : "Start Recording" }}
      </button>

      <div class="feedback-container">
        <p class="transcript">Transcript: {{ transcript }}</p>
        <p
          :class="[
            'feedback',
            feedback.includes('Failed') ? 'error' : 'success',
          ]"
        >
          {{ feedback }}
        </p>
      </div>
    </div>
    <div v-else><p>No data</p></div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "PracticeWordPage",
  setup() {
    const route = useRoute();
    const word = ref(route.query.word);
    const phonetic = ref(route.query.phonetic);

    const instructions = ref("");
    const transcript = ref("");
    const feedback = ref("");
    const isRecording = ref(false);
    const recognitionRef = ref(null);

    // Fetch instructions
    async function getInstructions(phonetic) {
      try {
        const response = await axios.post(
          "http://localhost:5000/instructions",
          {
            phonetic: phonetic,
          }
        );
        instructions.value = response.data;
      } catch (error) {
        console.error("Error getting instructions:", error);
      }
    }

    // Analyse voice transcript
    async function analyse() {
      try {
        const response = await axios.post("http://localhost:5000/analyse", {
          recognizedText: transcript.value,
          expectedWord: word.value,
        });
        feedback.value = response.data;
      } catch (error) {
        console.error("Error comparing phonetics:", error);
        feedback.value = "Failed to analyse pronunciation";
      }
    }

    // Start recording voice
    function startRecording() {
      if (!("webkitSpeechRecognition" in window)) {
        alert("Your browser does not support speech recognition");
        return;
      }

      const recognition = new window.webkitSpeechRecognition();
      recognitionRef.value = recognition;
      recognition.lang = "en-GB";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        isRecording.value = true;
      };

      recognition.onresult = (event) => {
        transcript.value = event.results[0][0].transcript;
        axios
          .post("http://localhost:5000/analyse", {
            recognizedText: transcript.value,
            expectedWord: word.value,
          })
          .then((response) => {
            feedback.value = response.data;
          })
          .catch((error) => {
            console.error("Error comparing phonetics:", error);
            feedback.value = "Failed to analyse pronunciation";
          });
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        alert(`An error occurred during speech recognition: ${event.error}`);
        isRecording.value = false;
      };

      recognition.onend = () => {
        isRecording.value = false;
      };

      recognition.start();
    }

    // Stop recording voice
    function stopRecording() {
      if (recognitionRef.value) {
        recognitionRef.value.stop();
      }
    }

    // Watch for transcript changes to call analyse function
    watch(transcript, (newTranscript) => {
      if (newTranscript) {
        analyse();
      }
    });

    // Fetch instructions on component mount
    onMounted(() => {
      if (phonetic.value) {
        getInstructions(phonetic.value);
      }
    });

    return {
      word,
      phonetic,
      instructions,
      transcript,
      feedback,
      isRecording,
      startRecording,
      stopRecording,
    };
  },
};
</script>

<style scoped>
.practice-div {
  padding: var(--content-pd);
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.speech-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.word-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 10px;
}

.word {
  color: #007bff;
  font-size: 28px;
}

.phonetic {
  font-style: italic;
  color: #6c757d;
  margin-bottom: 20px;
}

.instructions {
  background-color: #f1f1f1; /* Light background to distinguish the section */
  padding: 15px;
  border-radius: 8px; /* Rounded corners for a "card" feel */
  margin-bottom: 15px;
  font-size: 1.6rem;
  line-height: 1.5;
  color: #333; /* Darker color for readability */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow for emphasis */
}

.instructions strong {
  font-size: 18px;
  color: #007bff; /* Make the word 'Instructions' stand out */
}

.highlight {
  color: #dc3545; /* Highlight the key actions in a noticeable color */
  font-weight: bold;
}

.instruction-details {
  font-size: 1.6rem;
  line-height: 1.5;
  color: #555;
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-left: 4px solid #007bff; /* Add a vertical line to visually separate the details */
  border-radius: 5px;
}

.icon {
  margin-right: 8px; /* Space between icon and text */
}

.try-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

.try-button:hover {
  background-color: #218838;
}

.recording-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

.recording-button:hover {
  background-color: #c82333;
}

.feedback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.feedback {
  font-weight: bold;
  margin-top: 10px;
}

.success {
  color: #28a745;
}

.error {
  color: #dc3545;
}

.input-div {
  margin-top: 20px;
  width: 100%;
}

.input {
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

@media (max-width: 830px) {
  .practice-div {
    padding: var(--mobile-pd);
  }
}
</style>
