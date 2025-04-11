// File: src/backend/server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST endpoint for chat
app.post("/api/chat", async (req, res) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({ message: "User input is required." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(userInput);
    const response = await result.response;
    const text = response.text();

    res.json({ message: text });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({ message: "Gemini API Error. Please try again later." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Gemini server running at http://localhost:${PORT}`);
});
