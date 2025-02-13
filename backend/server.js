import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection (Direct String)
mongoose.connect("mongodb+srv://ArjunKathayat:khemradha@cluster0.zuui8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Define Movie Schema & Model
const movieSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: String,
  overview: String,
  poster_path: String,
  release_date: String,
  vote_average: Number,
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);

// ✅ API to store movies (Avoid Duplicates)
app.post("/movies", async (req, res) => {
  try {
    const movies = req.body.movies;

    const savePromises = movies.map(async (movie) => {
      await Movie.updateOne(
        { id: movie.id },
        { $set: movie },
        { upsert: true }
      );
    });

    await Promise.all(savePromises);
    res.json({ message: "✅ Movies saved successfully!" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ API to get movies
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
