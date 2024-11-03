<template>
  <div class="home-div">
    <SpeechRecognitionComponent class="speech-component" />
  </div>
</template>

<script>
import SpeechRecognitionComponent from "../components/SpeechRecognitionComponent.vue";

export default {
  name: "HomePage",
  components: {
    SpeechRecognitionComponent,
  },
};
</script>

<style scoped>
.home-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
  height: 100%;
  padding: 4rem 2rem;
}

@media (max-width: 830px) {
  .home-div {
    height: 100vh;
  }
}

@media (max-width: 490px) {
}
</style>
