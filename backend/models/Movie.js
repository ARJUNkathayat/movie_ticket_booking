import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  language: String,
  genre: [String],
  release_date: String,
  movie_code: String,
  rating: String
});

export default mongoose.model("Movie", movieSchema);
