import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import router from "../movies/movies.route";

configDotenv();

const collectionName = "users";

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!users[username]) {
    return res;
  }
});
