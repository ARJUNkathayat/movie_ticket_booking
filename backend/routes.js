const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie"); // ✅ Movie Model import karo

// ✅ POST API: Movies ko MongoDB me save karo
router.post("/", async (req, res) => {
  try {
    const movies = req.body.upcomingMovieData; // ✅ JSON se `upcomingMovieData` lo
    await Movie.insertMany(movies); // ✅ MongoDB me save karo
    res.json({ message: "✅ Movies saved successfully!" }); // ✅ Success response
  } catch (error) {
    console.error("Error saving movies:", error);
    res.status(500).json({ error: "Error saving movies" }); // ❌ Error response
  }
});

module.exports = router;
