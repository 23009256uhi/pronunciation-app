<template>
  <div class="container">
    <h1 class="heading">About Us</h1>
    <p class="paragraph">
      Welcome to <strong>LinguaAI</strong> – an AI-powered dictionary app
      designed to help you not only understand words but also master their
      pronunciation, so you can express yourself with clarity and confidence.
    </p>
    <p class="paragraph">
      Our app leverages advanced AI technology to give you immediate feedback on
      your pronunciation, so you can improve steadily and sound more natural
      when speaking. Each word includes an interactive pronunciation feature.
      Say the word aloud, and LinguaAI listens, analyzes, and provides feedback
      to help you improve. Our intelligent feedback system highlights where your
      pronunciation can be adjusted, focusing on aspects like stress,
      intonation, and sound accuracy.
    </p>
    <p class="paragraph">
      We’re here to help you on every step of your journey. If you have any
      questions or feedback, feel free to reach out – we’d love to hear from
      you.
    </p>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.container {
  padding: 5rem 2rem;
  max-width: 80rem;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.heading {
  font-size: var(--h1-font-size);
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--text-cl);
}

.paragraph {
  font-size: var(--p-font-size);
  line-height: 1.6;
  color: var(--text-cl);
  margin-bottom: 1.5rem;
}

@media (max-width: 830px) {
  .container {
    padding: var(--mobile-pd);
  }
}
</style>
