import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Conversation.module.css";
import ChatMessage from "../components/ChatMessage";
import UserChatMessage from "../components/UserChatMessage";

function Conversation() {
  const firstMessage = "Hi! What do you want to talk about?";
  const [conversation, setConversation] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // const handleSendMessage = (message) => {
  //   // This is where you can implement the logic to send and receive messages
  //   setConversation([...conversation, { sender: "User", text: message }]);
  // };

  // Fetch the entire conversation history when the component mounts
  async function fetchMessages() {
    try {
      const response = await axios.get("http://localhost:5000/messages");
      setConversation(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  }

  async function handleSendMessage() {
    if (!inputValue.trim()) return; // Prevent sending empty messages

    try {
      const updatedConversation = [
        ...conversation,
        { role: "user", text: inputValue },
      ];

      const response = await axios.post("http://localhost:5000/conversation", {
        inputValue,
      });

      console.log(response.data);
      const aiMessage = { role: "ai", text: response.data };
      setConversation([...updatedConversation, aiMessage]);

      setInputValue("");

      // fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className={styles.conversationDiv}>
      <div className={styles.container}>
        <div className={styles.chatContainer}>
          {conversation.map((msg, index) =>
            msg.role === "ai" ? (
              <ChatMessage
                key={index}
                message={msg.text}
                className={styles.chatMessageAnimated}
              />
            ) : (
              <UserChatMessage
                key={index}
                message={msg.text}
                className={styles.userMessage}
              />
            )
          )}
        </div>
        <div className={styles.inputDiv}>
          <div className={styles.innerInputDiv}>
            <input
              type="text"
              className={styles.input}
              placeholder="Type your message"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={handleKeyPress}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
