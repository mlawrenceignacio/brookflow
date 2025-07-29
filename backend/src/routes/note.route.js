import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  createNote,
  uploadFile,
  getUserNotes,
  deleteNote,
  deleteAllNotes,
  updateNote,
} from "../controllers/note.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createNote);
router.post("/upload", verifyToken, upload.single("file"), uploadFile);

router.get("/", verifyToken, getUserNotes);

router.delete("/:id", verifyToken, deleteNote);
router.delete("/", verifyToken, deleteAllNotes);

router.put("/:id", verifyToken, updateNote);

export default router;
