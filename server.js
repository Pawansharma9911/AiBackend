import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();

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

// ✅ cache DB connection for serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected with Database!");
  } catch (err) {
    console.error("MongoDB error:", err);
    throw err;
  }
};

// ✅ connect when function is invoked
connectDB();

// ✅ health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ❌ NO app.listen()
export default app;







