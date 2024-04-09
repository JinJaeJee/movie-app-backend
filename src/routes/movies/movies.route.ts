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

router.get("/search", async (req: Request, res: Response) => {
  let { query } = req.query;
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const moviesCollection = db.collection(collectionName);

  if (typeof query === "string") {
    query = query.replace(/_/g, " ");
    query = query.charAt(0).toUpperCase() + query.slice(1);
  }

  try {
    const moviesCursor = await moviesCollection.find({
      $or: [
        { title: { $regex: new RegExp(query as string, "i") } },
        { genre: { $regex: new RegExp(query as string, "i") } },
        { releaseYear: parseInt(query as string) || 0 },
      ],
    });

    const movies = await moviesCursor.toArray();

    if (movies.length === 0) {
      return res.status(404).json({ error: "No movies found" });
    }

    client.close();
    res.json(movies);
  } catch (err) {
    console.error("Error searching for movies:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
