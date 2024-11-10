import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";
import { metaphone } from "metaphone";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = 5000;

dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Google API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Gemini 1.5 model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to run prompt
async function run(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to generate AI response");
  }
}

let history = [];
let messages = [{ role: "ai", text: "Hi! What do you want to talk about?" }];

async function chat(message) {
  const chat = model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  const result = await chat.sendMessage(message);
  const response = await result.response;
  const text = response.text();
  return text;
}

// Endpoint for fetching word data from dictionary API
app.post("/fetchword", async (req, res) => {
  const { userInput } = req.body;

  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`
    );
    const wordData = response.data;

    if (!wordData) {
      return res.status(404).json({ error: "Word not found" });
    }

    res.json(wordData);

    console.log(wordData);
  } catch (error) {
    console.error("Error fetching word data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to search for a word using the AI and give the pronunciation back
app.post("/word", async (req, res) => {
  const { userInput } = req.body;

  try {
    const prompt = `If '${userInput}' is an English word, could you please reply with the phonetic transliteration of the word?`;
    const reply = await run(prompt);
    return res.json(reply);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for speech analysis
app.post("/analyse", async (req, res) => {
  const { recognizedText, expectedWord } = req.body;
  let differences = "";

  // Check if both words are provided
  if (!recognizedText || !expectedWord) {
    return res
      .status(400)
      .json({ error: "Both recognizedText and expectedWord are required" });
  }

  try {
    // Metaphone analysis
    const recognizedCode = metaphone(recognizedText);
    const expectedCode = metaphone(expectedWord);

    if (recognizedCode === expectedCode) {
      return res.json("Correct!");
    } else {
      const prompt = `The user said "${recognizedText}" but should have said "${expectedWord}". Provide detailed feedback on how to improve their pronunciation, focusing on the differences between "${recognizedCode}" and "${expectedCode}". Just say 1. what is wrong and 2. how to improve. Reply as it was a conversation between you and the user and don't make a list`;
      const reply = await run(prompt);
      return res.json(reply);
    }
  } catch (error) {
    console.error("Error importing metaphone or processing phonetics:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for instructions
app.post("/instructions", async (req, res) => {
  const { phonetic } = req.body;

  if (!phonetic) {
    return res.status(400).json({ error: "Phonetic is required" });
  }

  try {
    const prompt = `The user needs to practice this word: ${phonetic}. Please give instructions on how to pronounce it. Go straight to the point and don't make a list`;
    const reply = await run(prompt);
    return res.json(reply);
  } catch (error) {
    console.error("Error giving instructions:", error);
  }
});

// Endpoint for conversation
app.post("/conversation", async (req, res) => {
  // const { message, conversationId } = req.body;
  const message = req.body.inputValue;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const prompt = `The user said: "${message}". Respond appropriately in a conversational style, keep the conversation going, don't make reference to the fact that you are an ai unless asked`;
    const reply = await chat(prompt);

    messages.push({ role: "user", text: message }, { role: "ai", text: reply });

    console.log("message:", message);
    console.log("reply:", reply);
    console.log(history[0]);
    return res.json(reply);
  } catch (error) {
    console.error("Error handling conversation:", error);
  }
});

// Endpoint to fetch the messages
app.get("/messages", (req, res) => {
  res.json({ messages });
});

// -------------------------------------------------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
