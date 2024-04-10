import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { connectToDB } from "../../config";

configDotenv();
const router = express.Router();
const secretKey = process.env.SECRETKEY;

interface CreateUserDTO {
  username: string;
  fullname: string;
  role?: string;
  password: string;
  image?: string;
}

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const db = await connectToDB();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ username });

    if (!user || !user.password) {
      return res.status(404).json({ message: "user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: "8h" });

    const userProfile = {
      fullname: user.fullname,
      role: user.role,
      image: user.image,
    };

    res.json({ token, userProfile });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/create-user", async (req: Request, res: Response) => {
  const userData: CreateUserDTO = req.body;

  try {
    const db = await connectToDB();
    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({
      username: userData.username,
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser: CreateUserDTO = {
      username: userData.username,
      fullname: userData.fullname,
      role: userData.role || "Member",
      password: hashedPassword,
      image: userData.image || "",
    };

    await usersCollection.insertOne(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
