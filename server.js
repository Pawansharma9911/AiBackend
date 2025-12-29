
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






const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/test", async (req, res) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: req.body.message,
        },
      ],
    });
    res.send(completion.choices[0].message.content);
  } catch (err) {
    console.error(err);
    res.status(500).send("Groq API error");
  }
});
export default app;

