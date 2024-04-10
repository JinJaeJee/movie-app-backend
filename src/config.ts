import { MongoClient } from "mongodb";
import mongoose from "mongoose";

export function connectToDatabase() {
  mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));
}

export async function connectToDB() {
  const client = new MongoClient(process.env.DB_CONNECTION);
  await client.connect();
  return client.db("movieDB");
}
