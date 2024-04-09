import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { connectToDatabase } from "./config";
import movieRoutes from "./routes/movies/movies.route";

configDotenv();

const app = express();
const PORT = process.env.API_PORT || 3333;

app.use(express.json());
app.use(cors());

connectToDatabase();
app.use("/movies", movieRoutes);
app.use("/auth");

app.get("/checkapi", (req: Request, res: Response) => {
  res.json({ message: "Welcome to JUST-SERVICE API!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
