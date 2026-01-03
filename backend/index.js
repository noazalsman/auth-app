import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect-db.js";
import authRoutes from "./auth-routes.js"; 
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json()); // parse JSON bodies
app.use(cookieParser()); // parse cookies

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});


