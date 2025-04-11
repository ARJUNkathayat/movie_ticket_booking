import express from "express";
import axios from "axios";
import Movie from "./models/Movie.js";

const router = express.Router();

router.get("/fetch-and-save-movies", async (req, res) => {
  try {
    // Fetch data from Cinepolis API
    const response = await axios.get(
      "https://api_new.cinepolisindia.com/api/movies/now-playing-filtered/?city_id=9"
    );

    const movies = response.data.data;

    // Remove old movies
    await Movie.deleteMany({});
    // Save new movies
    await Movie.insertMany(movies);

    res.status(200).json({ message: "✅ Movies saved to MongoDB!", count: movies.length });
  } catch (err) {
    console.error("❌ Error fetching/saving:", err.message);
    res.status(500).json({ error: "Error fetching and saving movies" });
  }
});

export default router;
