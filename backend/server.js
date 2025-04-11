// server.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json()); 

const movieSchema = new mongoose.Schema({}, { strict: false });
const Movie = mongoose.model("Movie", movieSchema);

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  seatType: String,
  tickets: Number,
  createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model("Booking", bookingSchema);
  
app.get("/api/now-playing", async (req, res) => {
  try {
    console.log("📡 Fetching Cinepolis movie data...");

    const response = await axios.get(
      "https://api_new.cinepolisindia.com/api/movies/now-playing-filtered/?city_id=9"
    );

    await Movie.deleteMany({});
    await Movie.insertMany(response.data.data);

    res.json({
      message: "✅ Movies updated successfully!",
      count: response.data.data.length
    });
  } catch (error) {
    console.error("❌ Error fetching movies:", error.message);
    res.status(500).json({ error: "Failed to fetch and save data" });
  }
});

// 🧾 Route to save user bookings
app.post("/api/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "✅ Booking saved successfully!" });
  } catch (err) {
    console.error("❌ Booking error:", err);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
