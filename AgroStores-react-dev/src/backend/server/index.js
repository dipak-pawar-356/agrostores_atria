// File: server/index.js
import express from "express";
import cors from "cors";
import chatRoute from "./chatController.js";
import dotenv from "dotenv";

dotenv.config();
// Connect to MongoDB
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", chatRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is running. Use /api/chat for chatbot.");
});