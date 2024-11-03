<template>
  <div class="conversation-div">
    <div class="container">
      <div class="chat-container">
        <!-- Loop through the conversation and render messages -->
        <div
          v-for="(msg, index) in conversation"
          :key="index"
          class="messages-container"
        >
          <ChatMessageComponent
            v-if="msg.role === 'ai'"
            :message="msg.text"
            class="chat-message-animated"
          />
          <UserChatMessageComponent
            v-else
            :message="msg.text"
            class="user-message"
          />
        </div>
      </div>

      <!-- Input Field -->
      <div class="input-div-conversation">
        <div class="inner-input-div">
          <input
            type="text"
            class="input-conversation"
            placeholder="Type your message"
            v-model="inputValue"
            @keydown="handleKeyPress"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import ChatMessageComponent from "@/components/ChatMessageComponent.vue";
import UserChatMessageComponent from "@/components/UserChatMessageComponent.vue";

export default {
  name: "ConversationPage",
  components: {
    ChatMessageComponent,
    UserChatMessageComponent,
  },
  setup() {
    const conversation = ref([]);
    const inputValue = ref("");

    // Fetch the entire conversation history when the component mounts
    async function fetchMessages() {
      try {
        const response = await axios.get("http://localhost:5000/messages");
        conversation.value = response.data.messages;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    // Handle seding a message
    async function handleSendMessage() {
      if (!inputValue.value.trim()) return; // Prevent sending empty messages

      try {
        const updatedConversation = [
          ...conversation.value,
          { role: "user", text: inputValue.value },
        ];

        const response = await axios.post(
          "http://localhost:5000/conversation",
          {
            inputValue: inputValue.value,
          }
        );

        const aiMessage = { role: "ai", text: response.data };
        conversation.value = [...updatedConversation, aiMessage];

        inputValue.value = "";
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }

    // Handle Enter key press to send the message
    function handleKeyPress(event) {
      if (event.key === "Enter") {
        handleSendMessage();
      }
    }

    // Fetch messages on component mount
    onMounted(() => {
      fetchMessages();
    });

    return {
      conversation,
      inputValue,
      handleKeyPress,
    };
  },
};
</script>

<style scoped>
body {
  overflow-x: hidden;
}

.conversation-div {
  padding: var(--content-pd);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* overflow-x: hidden; */
}

.container {
  max-width: 768px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  overflow-x: hidden;
}

.chat-container {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex-grow: 1;
  width: 100%;
  max-height: calc(100vh - 14rem);
  padding-bottom: 6rem;
  overflow-y: auto;

  /* Hide scrollbar for WebKit browsers (Chrome, Safari, Edge) */
  ::-webkit-scrollbar {
    width: 0px;
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none;
}

.messages-container {
  display: flex;
  flex-direction: column;
}

.chat-message-animated {
  animation: slideInFromLeft 0.5s ease-out forwards;
  opacity: 0; /* Hide initially before animation starts */
}

.user-message {
  align-self: flex-end;
}

.input-div-conversation {
  display: flex;
  justify-content: center;
  flex-grow: 0;
  max-width: 768px;
  width: 100%;
}

.inner-input-div {
  width: 100%;
}

.input-conversation {
  width: 100%;
  padding: 1.6rem 2.8rem;
  font-size: 1.8rem;
  border-radius: 200px;
  border: 1px solid black;
  background-color: var(--input-cl);
  color: var(--text-cl);
}

.input-conversation:focus {
  outline: none;
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-30%); /* Start off-screen to the left */
    opacity: 0;
  }
  100% {
    transform: translateX(0); /* End at the normal position */
    opacity: 1;
  }
}

@media (max-width: 830px) {
  .conversation-div {
    padding: var(--mobile-pd);
    height: 100vh;
  }
}
</style>
