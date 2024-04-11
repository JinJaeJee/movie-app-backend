import express, { Request, Response } from "express";
import { connectToDB } from "../../config";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const db = await connectToDB();
    const usersCollection = db.collection("users");
    const userIdObject = new ObjectId(userId);
    const user = await usersCollection.findOne({ _id: userIdObject });
    // console.log(user);

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

export default router;
