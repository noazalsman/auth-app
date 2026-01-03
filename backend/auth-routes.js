import express from "express";
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword } from "./auth-controller.js";
import { verifyToken } from "./utils/jwt-utils.js";
import { checkAuth } from "./auth-controller.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/logout", logout);

export default router;