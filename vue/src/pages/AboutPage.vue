<template>
  <div class="container">
    <h1 class="heading">About Us</h1>
    <p class="paragraph">
      Welcome to our website! We are dedicated to providing the best service
      possible, with a focus on reliability, customer satisfaction, and
      innovation. Our team of experts works around the clock to bring you the
      latest and greatest in the industry.
    </p>
    <p class="paragraph">
      Founded in <strong>[Year]</strong>, we have continuously grown our
      offerings and expanded our expertise, ensuring that we remain at the
      forefront of the field. We are committed to maintaining the highest
      standards of quality and excellence in everything we do.
    </p>
    <p class="paragraph">
      Our mission is to create value for our customers through innovative
      solutions, outstanding service, and a commitment to integrity. Whether
      you're here for <strong>[service/product your company provides]</strong>
      , or just browsing, we're here to support you every step of the way.
    </p>
    <p class="paragraph">
      Thank you for visiting! If you have any questions or feedback, feel free
      to
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
