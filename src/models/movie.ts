import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  genre: [String],
  releaseYear: Number,
  description: String,
  thumbnailUrl: String,
  rating: Number,
});

export const Movie = mongoose.model("Movie", movieSchema);
