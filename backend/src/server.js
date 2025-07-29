import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "../src/routes/auth.route.js";
import noteRoutes from "../src/routes/note.route.js";
import userRoutes from "../src/routes/user.route.js";
import "./cron/resetAttemps.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("\nMongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server started on port ${process.env.PORT}...`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
