import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fetch from "node-fetch"; // ✅ Required for Fetch in Node.js

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://ArjunKathayat:khemradha@cluster0.zuui8.mongodb.net/moviesDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Mongoose Schema
const movieSchema = new mongoose.Schema({
  movie_id: String,
  movie_title: String,
  movie_language: String,
  movie_genre: String,
  release_date: String,
  movie_poster_url: String,
  trailer_url: String,
  run_time: Number,
  is_coming_soon: Boolean,
});

const Movie = mongoose.model("CinepolisMovie", movieSchema);

// ✅ Fetch and Store Movies from Cinepolis API
app.get("/fetch-cinepolis-movies", async (req, res) => {
  try {
    const { city_id = "9" } = req.query;
    const apiUrl = `https://api_new.cinepolisindia.com/api/movies/now-playing-filtered/?city_id=${city_id}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.data) || data.data.length === 0) {
      console.log("⚠️ API response is empty or format changed!");
      return res.status(404).json({ error: "No movies found from Cinepolis API" });
    }

    // Transform Data Before Saving
    const transformedMovies = data.data.map((movie) => ({
      movie_id: movie.ID || "N/A",
      movie_title: movie.Title || "Unknown",
      movie_language: movie.commmonLangaugesJoined || "English",
      movie_genre: "N/A", // Not provided in API
      release_date: "N/A", // Not provided in API
      movie_poster_url: movie.GraphicUrl || "N/A",
      trailer_url: "", // Not provided in API
      run_time: movie.RunTime || 0,
      is_coming_soon: movie.is_coming_soon === "Y" ? true : false, // ✅ Convert "Y"/"N" to Boolean
    }));

    // Save Movies in MongoDB
    const savePromises = transformedMovies.map(async (movie) => {
      await Movie.updateOne(
        { movie_id: movie.movie_id },
        { $set: movie },
        { upsert: true }
      );
    });

    await Promise.all(savePromises);
    res.json({ message: "✅ Movies fetched and stored successfully!" });

  } catch (error) {
    console.error("❌ Error fetching and saving movies:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Save Movies Manually
app.post("/save-cinepolis-movies", async (req, res) => {
  try {
    const movies = req.body.movies;

    if (!movies || movies.length === 0) {
      return res.status(400).json({ error: "No movies found in request body" });
    }

    const cleanMovie = (movie) => ({
      movie_id: movie.ID || "N/A",
      movie_title: movie.Title || "Unknown",
      movie_language: movie.commmonLangaugesJoined || "English",
      movie_genre: "N/A",
      release_date: "N/A",
      movie_poster_url: movie.GraphicUrl || "N/A",
      trailer_url: "",
      run_time: movie.RunTime || 0,
      is_coming_soon: movie.is_coming_soon === "Y" ? true : false,
    });

    const savePromises = movies.map(async (movie) => {
      await Movie.updateOne(
        { movie_id: movie.ID },
        { $set: cleanMovie(movie) },
        { upsert: true }
      );
    });

    await Promise.all(savePromises);
    res.json({ message: "✅ Movies saved manually!" });

  } catch (error) {
    console.error("❌ Error saving movies:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get Stored Movies
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
