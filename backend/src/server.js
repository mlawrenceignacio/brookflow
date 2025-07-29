import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import authRoutes from "../src/routes/auth.route.js";
import noteRoutes from "../src/routes/note.route.js";
import userRoutes from "../src/routes/user.route.js";
import "./cron/resetAttemps.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/user", userRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("\nMongoDB connected");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
