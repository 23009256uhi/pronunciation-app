import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./PracticeWord.module.css";

function PracticeWord() {
  const location = useLocation();
  const { word, phonetic } = location.state || {};
  const [instructions, setInstructions] = useState("");
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  // GET INSTRUCTIONS FUNCTION--------------------------------------------------------
  async function getInstructions(phonetic) {
    try {
      const response = await axios.post("http://localhost:5000/instructions", {
        phonetic: phonetic,
      });
      setInstructions(response.data);
    } catch (error) {
      console.error("Error getting isntructions:", error);
    }
  }

  // ANALYSE VOICE TRANSCRIPT--------------------------------------------------------
  async function analyse() {
    console.log("start analyse");
    console.log("transcript:", transcript);

    try {
      console.log("before post");
      const response = await axios.post("http://localhost:5000/analyse", {
        recognizedText: transcript,
        expectedWord: word,
      });
      console.log("after post");
      console.log(response.data);
      setFeedback(response.data);
    } catch (error) {
      console.error("Error comparing phonetics:", error);
      setFeedback("Failed to analyse pronunciation");
    }
    // axios
    //   .post("http://localhost:5000/analyse", {
    //     recognizedText: transcript,
    //     // recognizedText: "random",
    //     expectedWord: word,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setFeedback(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error comparing phonetics:", error);
    //     setFeedback("Failed to analyse pronunciation");
    //   });
  }

  // START RECORDING VOICE FUNCTION--------------------------------------------------------
  function startRecording() {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-GB";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      // console.log("Speech recognition result:", transcript);
      // console.log("Phonetic:", phonetic);
      // setTranscript(transcript);
      // setIsRecording(false);

      // Send transcript and word to backend for comparison
      // analyse();

      axios
        .post("http://localhost:5000/analyse", {
          recognizedText: transcript,
          expectedWord: word,
        })
        .then((response) => {
          setFeedback(response.data);
        })
        .catch((error) => {
          console.error("Error comparing phonetics:", error);
          setFeedback("Failed to analyse pronunciation");
        });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert(`An error occurred during speech recognition: ${event.error}`);
      setIsRecording(false);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsRecording(false);
    };

    recognition.start();
  }

  // STOP RECORDING VOICE FUNCTION--------------------------------------------------------
  function stopRecording() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }

  // CALL ANALYSE WHEN TRANSCRIPT IS UPDATED
  useEffect(() => {
    if (transcript) {
      analyse();
    }
  }, [transcript]);

  // -----------------------------------------------------------------------------------

  useEffect(() => {
    getInstructions(phonetic);
  }, [phonetic]);

  // -----------------------------------------------------------------------------------

  return (
    <div className={styles.practiceDiv}>
      {word && phonetic ? (
        <div className={styles.speechContainer}>
          <h1 className={styles.wordTitle}>
            Let's practice how to say:{" "}
            <span className={styles.word}>{word}</span>
          </h1>
          <p className={styles.phonetic}>
            Phonetic transcription: <strong>{phonetic}</strong>
          </p>
          {/* <p className={styles.instructions}>
            Read the instructions below and When ready press the button to start
            recording and pronounce the word aloud.
          </p>
          <p>{instructions}</p> */}

          <p className={styles.instructions}>
            <strong>Instructions:</strong> Read the instructions below, and when
            ready, <span className={styles.highlight}>press the button</span> to
            start recording and{" "}
            <span className={styles.highlight}>pronounce the word aloud</span>.
          </p>
          <p className={styles.instructionDetails}>{instructions}</p>

          {/* Button with Microphone for Start Recording */}
          <button
            className={isRecording ? styles.recordingButton : styles.tryButton}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? <>Stop Recording</> : <>Start Recording</>}
          </button>

          <div className={styles.feedbackContainer}>
            <p className={styles.transcript}>Transcript: {transcript}</p>
            <p
              className={`${styles.feedback} ${
                feedback.includes("Failed") ? styles.error : styles.success
              }`}
            >
              {feedback}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <p>No data</p>
        </div>
      )}
    </div>

    // <div className={styles.practiceDiv}>
    //   {word && phonetic ? (
    //     <div>
    //       <h1>Practice pronouncing the word: {word}</h1>
    //       <p>Phonetic: {phonetic}</p>
    //       <p>Instructions: {instructions}</p>
    //       {isRecording ? (
    //         <button className={styles.recordingBtn} onClick={stopRecording}>
    //           Stop Recording
    //         </button>
    //       ) : (
    //         <button className={styles.tryBtn} onClick={startRecording}>
    //           Start Practicing
    //         </button>
    //       )}
    //       <p>Transcript: {transcript}</p>
    //       <p>Feedback: {feedback}</p>
    //     </div>
    //   ) : (
    //     <div>
    //       <p>No data</p>
    //     </div>
    //   )}
    // </div>
  );
}

export default PracticeWord;
