<template>
  <!-- <div :class="['chat-message-div', className]">
    <img :src="logoIcon" alt="icon" class="logo-icon" />
    <p class="message">{{ message }}</p>
  </div> -->
  <div class="chat-message-div">
    <img :src="logoIcon" alt="icon" class="logo-icon" />
    <p class="message">{{ message }}</p>
  </div>
</template>

<script>
import logoIcon from "../assets/logo.svg";

export default {
  name: "ChatMessageComponent",
  props: {
    message: {
      type: String,
      required: true,
    },
    // className: {
    //   type: String,
    //   required: true,
    // },
  },
  data() {
    return {
      logoIcon,
    };
  },
};
</script>

<style scoped>
.chat-message-div {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.logo-icon {
  width: 30px;
  height: 30px;
  filter: invert(98%) sepia(2%) saturate(285%) hue-rotate(200deg)
    brightness(94%) contrast(96%);
}

.message {
  background-color: var(--message-cl);
  padding: var(--chat-pd);
  border-radius: var(--chat-radius);
}
</style>
