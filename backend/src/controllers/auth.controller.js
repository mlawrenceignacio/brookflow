import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateResetEmailHTML } from "../utils/emailTemplates/resetPasswordTemplate.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword)
      return res.status(400).json({ message: "All fields are required." });

    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: "Username already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match." });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "Email already in use." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed.", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    res.status(400).json({ message: "Login failed.", error: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).json({ message: "Email required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    const now = new Date();

    if (user.resetAttemptsToday >= 3) {
      return res.status(429).json({
        message: "Reset limit reached for today. Try again tomorrow.",
      });
    }

    const code = crypto.randomInt(100000, 999999).toString();

    user.resetCode = code;
    user.resetCodeExpiry = Date.now() + 15 * 60 * 1000;
    user.resetAttemptsToday += 1;
    user.lastResetAttempt = now;
    await user.save();

    const subject = "Your Reset Password Code";
    const html = generateResetEmailHTML(user.username, user.resetCode);

    await sendEmail(email, subject, html);

    res.status(200).json({ message: "Reset code sent to email." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send request code.", error: err.message });
  }
};

export const verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "All fields required." });
    }

    const user = await User.findOne({ email });

    if (!user || user.resetCode !== code) {
      return res.status(400).json({ message: "Invalid reset code." });
    }

    if (Date.now() > user.resetCodeExpiry) {
      return res.status(400).json({ message: "Reset code has expired." });
    }

    return res.status(200).json({ message: "Code verified successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error.", error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPass } = req.body;

    if (!email || !newPassword || !confirmPass)
      return res.status(400).json({ message: "All fields required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found." });

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      res.status(400).json({
        message: "Your new password must be different from your old password.",
      });
    }

    if (newPassword !== confirmPass)
      return res.status(400).json({ message: "Passwords do not match." });

    if (Date.now() > user.resetCodeExpiry)
      return res.status(400).json({ message: "Reset code expired." });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetCode = null;
    user.resetCodeExpiry = null;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to reset password.", error: err.message });
  }
};
