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
    "mongodb+srv://ArjunKathayat:khemradha@cluster0.zuui8.mongodb.net/moviesDB?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Mongoose Schema & Model (Updated for Cinepolis Data)
const movieSchema = new mongoose.Schema({
  ID: String, // Unique Movie ID from Cinepolis
  movie_title: String,
  movie_lang: String,
  genre: String,
  releaseDate: String,
  moviePosterUrl: String,
  trailerUrl: String,
  runTime: Number,
  isComingSoon: String,
});

const Movie = mongoose.model("Movie", movieSchema);

// ✅ API to Fetch Cinepolis Movies
app.get("/cinepolis-movies", async (req, res) => {
  try {
    const response = await fetch(
      "https://cinepolisindia.com/api/movies" // ✅ Replace with the actual Cinepolis API endpoint
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Cinepolis API" });
  }
});

// ✅ API to Store Movies in MongoDB
app.post("/movies", async (req, res) => {
  try {
    const movies = req.body.data; // ✅ Adjusted to match Cinepolis API data structure

    const savePromises = movies.map(async (movie) => {
      await Movie.updateOne(
        { ID: movie.ID }, // ✅ Use `ID` from Cinepolis API
        { 
          $set: {
            movie_title: movie.movie_title,
            movie_lang: movie.movie_lang,
            genre: movie.m_movie_genre_name,
            releaseDate: movie.movie_release_date,
            moviePosterUrl: movie.movie_image_url_1,
            trailerUrl: movie.movie_trailer,
            runTime: movie.run_time,
            isComingSoon: movie.is_coming_soon
          }
        },
        { upsert: true }
      );
    });

    await Promise.all(savePromises);
    res.json({ message: "✅ Movies saved successfully!" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ API to Get Stored Movies
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
