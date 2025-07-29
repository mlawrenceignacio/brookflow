import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      requried: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    quote: {
      type: String,
      default: "",
    },
    resetCode: {
      type: String,
      default: null,
    },
    resetCodeExpiry: {
      type: Date,
      default: null,
    },
    resetAttemptsToday: {
      type: Number,
      default: 0,
    },
    lastResetAttempt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
