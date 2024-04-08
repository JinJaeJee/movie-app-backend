import mongoose from "mongoose";

export function connectToDatabase() {
  mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));
}
