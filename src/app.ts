import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";

configDotenv();

const app = express();
const PORT = process.env.API_PORT || 8080;

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.get("/checkapi", (req: Request, res: Response) => {
  res.send("Hello there, Api is working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
