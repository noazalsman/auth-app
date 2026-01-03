import bcryptjs from "bcryptjs";
import crypto from "crypto";
import User from "./db/user-model.js";
import { generateTokenAndSaveCookie } from "./utils/jwt-utils.js";
import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendResetPasswordSuccessEmail } from "./emails/email.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit verification token
    const verificationTokenExpiresAt = Date.now() + 1000 * 60 * 60 * 24; // 24 hours

    const user = new User({ 
      email, 
      password: hashedPassword, 
      name, 
      verificationToken, 
      verificationTokenExpiresAt 
    });
    await user.save();

    generateTokenAndSaveCookie(res, user._id);

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ 
      message: "User created successfully" , 
      user: {
        ...user._doc, 
        password: undefined
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findOne({ verificationToken: token, verificationTokenExpiresAt: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateTokenAndSaveCookie(res, user._id);

    user.lastLogin = Date.now();
    await user.save();

    res.status(200).json({ message: "Logged in successfully", user: {
      ...user._doc,
      password: undefined
    } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex"); // 20 bytes = 40 characters
    const resetPasswordTokenExpiresAt = Date.now() + 1000 * 60 * 60; // 1 hour

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresAt = resetPasswordTokenExpiresAt;
    await user.save();

    await sendResetPasswordEmail(user.email, `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`);

    res.status(200).json({ message: "Reset password email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcryptjs.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetPasswordSuccessEmail(user.email);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
    res.status(200).json({ message: "Authenticated", user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logged out successfully" });
};