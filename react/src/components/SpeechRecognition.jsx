import styles from "./SpeechRecognition.module.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SpeechRecognition() {
  // const [transcript, setTranscript] = useState("");
  // const [feedback, setFeedback] = useState("");
  // const [isRecording, setIsRecording] = useState(false);
  // const recognitionRef = useRef(null);
  // const word = "random";
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // function startRecording() {
  //   if (!("webkitSpeechRecognition" in window)) {
  //     alert("Your browser does not support speech recognition");
  //     return;
  //   }

  //   const recognition = new window.webkitSpeechRecognition();
  //   recognitionRef.current = recognition;

  //   recognition.lang = "en-GB";
  //   recognition.continuous = false;
  //   recognition.interimResults = false;

  //   recognition.onstart = () => {
  //     console.log("Speech recognition started");
  //     setIsRecording(true);
  //   };

  //   recognition.onresult = (event) => {
  //     const transcript = event.results[0][0].transcript;
  //     console.log("Speech recognition result:", transcript);
  //     setTranscript(transcript);
  //     setIsRecording(false);

  //     // Send transcript and word to backend for comparison
  //     axios
  //       .post("http://localhost:5000/analyse", {
  //         recognizedText: transcript,
  //         expectedWord: word,
  //       })
  //       .then((response) => {
  //         setFeedback(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error comparing phonetics:", error);
  //         setFeedback("Failed to analyse pronunciation");
  //       });
  //   };

  //   recognition.onerror = (event) => {
  //     console.error("Speech recognition error:", event.error);
  //     alert(`An error occurred during speech recognition: ${event.error}`);
  //     setIsRecording(false);
  //   };

  //   recognition.onend = () => {
  //     console.log("Speech recognition ended");
  //     setIsRecording(false);
  //   };

  //   recognition.start();
  // }

  // function stopRecording() {
  //   if (recognitionRef.current) {
  //     recognitionRef.current.stop();
  //   }
  // }

  // function post() {
  //   axios
  //     .post("http://localhost:5000/analyse", {
  //       recognizedText: "kantom",
  //       expectedWord: word,
  //     })
  //     .then((response) => {
  //       setFeedback(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error comparing phonetics:", error);
  //       setFeedback("Failed to analyse pronunciation");
  //     });
  // }

  // function postWord(input) {
  //   axios
  //     .post("http://localhost:5000/word", {
  //       userInput: input,
  //     })
  //     .then((response) => {
  //       setPhonetic(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }

  function navigateToResults() {
    navigate(`/search/${inputValue}`);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      navigateToResults();
    }
  }

  return (
    <div className={styles.speechContainer}>
      <>
        <div className={styles.chatDiv}>
          <h3 className={styles.chatHeader}>
            Which word do you want to practice?
          </h3>
        </div>
      </>
      <div className={styles.inputDiv}>
        <input
          type="text"
          className={styles.input}
          placeholder="Write your word here"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={handleKeyPress}
        ></input>
      </div>
    </div>
  );
}

export default SpeechRecognition;
