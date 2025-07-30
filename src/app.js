import express from "express";
import cors from "cors";
import morgan from "morgan";
import ConnectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
// App
const app = express();
// connect to DB
ConnectDB();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use("/api/v1", require("./routes/index.js"));
// Error handling middleware (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

export default app;
