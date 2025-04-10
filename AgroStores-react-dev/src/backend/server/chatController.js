// File: server/chatController.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Load API key from .env
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

router.post("/chat", async (req, res) => {
  const { userInput } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(
      `You are a smart assistant for farmers, nursery owners, and agricultural vendors. Answer this query: ${userInput}`
    );

    const response = await result.response;
    const text = await response.text();

    res.json({ message: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

export default router;
