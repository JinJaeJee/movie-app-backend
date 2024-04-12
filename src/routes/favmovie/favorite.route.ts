import express, { Request, Response } from "express";
import { connectToDB } from "../../config";
import { ObjectId } from "mongodb";
import { isObjectIdOrHexString } from "mongoose";

const router = express.Router();

router.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const db = await connectToDB();
    const usersCollection = db.collection("users");
    const userIdObject = new ObjectId(userId);
    const user = await usersCollection.findOne({ _id: userIdObject });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favoriteMovies = await db
      .collection("fav_movies")
      .find({ userId: userId })
      .toArray();

    console.log();

    res.json(favoriteMovies);
  } catch (error) {
    console.error("Error getting favorite movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add", async (req: Request, res: Response) => {
  const { userId, movieId, thumbnailUrl, title } = req.body;

  try {
    const db = await connectToDB();
    const favMoviesCollection = db.collection("fav_movies");
    const isExistingFav = await favMoviesCollection.findOne({
      userId,
      movieId,
    });
    if (isExistingFav) {
      return res
        .status(400)
        .json({ message: "User already has this movie in favorites" });
    }

    await favMoviesCollection.insertOne({
      userId,
      movieId,
      thumbnailUrl,
      title,
    });

    return res
      .status(200)
      .json({ message: "Favorite movie added successfully" });
  } catch (error) {
    console.error("Error adding favorite movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete", async (req: Request, res: Response) => {
  const { userId, movieId } = req.body;

  try {
    const db = await connectToDB();
    const favMoviesCollection = db.collection("fav_movies");

    const existingFavorite = await favMoviesCollection.findOne({
      userId,
      movieId,
    });

    console.log(existingFavorite);
    if (!existingFavorite) {
      return res.status(404).json({ message: "Favorite movie not found" });
    }

    await favMoviesCollection.deleteOne({ userId, movieId });

    return res
      .status(200)
      .json({ message: "Favorite movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite movie:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
