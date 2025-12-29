
import express from "express";
import "dotenv/config";
import cors from "cors";
import Groq from "groq-sdk";

import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ai-frontend-cyan-two.vercel.app"
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));

app.use("/api", chatRoutes);

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected with Database!");
  } catch (err) {
    console.log("Failed to connect with Db", err);
  }
};

connectDB();







export default app;

