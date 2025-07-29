import express from "express";
import { uploadProfilePic } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

router.post(
  "/upload-profile",
  verifyToken,
  upload.single("file"),
  uploadProfilePic
);

export default router;
