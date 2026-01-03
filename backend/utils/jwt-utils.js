import jwt from "jsonwebtoken";

export const generateTokenAndSaveCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("authToken", token, { 
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict", // prevent CSRF attacks
    secure: process.env.NODE_ENV === "production", 
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  });

  return token;
};