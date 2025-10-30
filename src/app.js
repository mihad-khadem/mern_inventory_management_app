import express from "express";
import cors from "cors";
import morgan from "morgan";
import ConnectDB from "./config/db.js";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
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
// test route
app.get("/", (req, res) => {
  res.json({ message: "Inventory Management System API is working" });
});
// API routes
app.use("/api/v1", routes);
// not found route
app.use(notFound);
// Error handling middleware
app.use(errorHandler);

export default app;
