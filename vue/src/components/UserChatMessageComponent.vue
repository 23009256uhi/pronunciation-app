<template>
  <!-- <div :class="['chat-message-div', className]">
    <p class="message">{{ message }}</p>
  </div> -->
  <div class="chat-message-div user-message">
    <p class="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "UserChatMessageComponent",
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
};
</script>

<style scoped>
.chat-message-div {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.user-message {
  align-self: flex-end;
}

.message {
  background-color: var(--input-cl);
  padding: var(--chat-pd);
  border-radius: var(--chat-radius);
}
</style>
