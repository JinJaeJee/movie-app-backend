import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";

configDotenv();
const router = express.Router();
const url = process.env.DB_CONNECTION;
const dbName = "movieDB";
const collectionName = "movies";

router.get("/getAlls", async (req: Request, res: Response) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const moviesCollection = db.collection(collectionName);
    const movies = await moviesCollection.find().toArray();

    client.close();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "internal server error" });
  }
});

export default router;
