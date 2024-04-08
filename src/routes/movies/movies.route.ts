import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";

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

router.get("/getOne/:id", async (req: Request, res: Response) => {
  try {
    const movieID = req.params.id;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const moviesCollection = db.collection(collectionName);

    const movie = await moviesCollection.findOne({
      _id: new ObjectId(movieID),
    });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    client.close();
    res.json(movie);
  } catch (error) {
    console.error("Error fetching movie by id:", error);
    res.status(500).json({ error: "internal server error" });
  }
});

export default router;
