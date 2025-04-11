import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import debounce from "lodash.debounce";

const BookingPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(true);

  // 👇 Navigation to TicketDetail page
  const ticketHandle = (sessionId, CinemaId) => {
    navigate(`/ticketdetail/${movieId}/${sessionId}/${CinemaId}`);
  };

  // 👇 Fetch movie details
  const fetchMovieDetails = useCallback(
    debounce(async () => {
      try {
        const res = await fetch(
          `https://api_new.cinepolisindia.com/api/movies/movie-details-new-test/${movieId}/?movie_id=${movieId}&city_id=9&isVip=N`
        );
        if (!res.ok) throw new Error("Too Many Requests");
        const json = await res.json();
        if (json?.data?.length > 0) setDetails(json.data[0]);
      } catch (err) {
        console.error("Error loading movie:", err);
      } finally {
        setLoading(false);
      }
    }, 500),
    [movieId]
  );

  // 👇 Fetch showtimes
  const fetchTheaterDetails = useCallback(
    debounce(async (date) => {
      try {
        const res = await fetch(
          `https://api_new.cinepolisindia.com/api/movies/show-times/${movieId}/?request_type=get-show-times&show_date=${date}&movie_id=${movieId}&city_id=9&experience=&isVip=N`
        );
        if (!res.ok) throw new Error("Too Many Requests");
        const json = await res.json();
        setTickets(json.data || []);
      } catch (err) {
        console.error("Error loading shows:", err);
      }
    }, 500),
    [movieId]
  );

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  useEffect(() => {
    fetchTheaterDetails(selectedDate);
  }, [selectedDate, fetchTheaterDetails]);

  if (loading) {
    return <div className="text-white text-center mt-10 animate-pulse">Loading movie details...</div>;
  }

  if (!details) {
    return <div className="text-white text-center mt-10">❌ Movie not found.</div>;
  }

  return (
    <div className="bg-gradient-to-br from-black to-gray-900 text-white min-h-screen">
      <Header />

      {/* 🎬 Movie Banner */}
      <div className="relative">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <img
          src={details.movie_image_url_1}
          alt={details.Title}
          className="w-full h-[400px] object-cover rounded-b-2xl shadow-xl"
        />
        <div className="absolute bottom-6 left-10">
          <h1 className="text-4xl font-bold text-white drop-shadow-xl">{details.Title}</h1>
        </div>
      </div>

      {/* 📃 Movie Info */}
      <div className="relative z-10 px-10 pt-10">
        <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl shadow-2xl flex flex-col md:flex-row gap-6 items-center">
          <div className="w-[200px] flex-shrink-0">
            <img
              src={details.movie_image_url_1}
              alt={details.Title}
              className="w-full rounded-lg shadow-lg border border-red-500"
            />
          </div>
          <div className="flex-1 text-gray-300 space-y-4">
            <h2 className="text-3xl font-semibold text-white">{details.Title}</h2>
            <p>{details.Synopsis || "No description available."}</p>
          </div>
        </div>
      </div>

      {/* 📅 Date Picker */}
      <div className="relative z-10 px-10 pt-8">
        <label className="block text-gray-300 text-lg mb-2">📅 Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-500 transition-all"
        />
      </div>

      {/* 🎟️ Showtimes */}
      <div className="relative z-10 px-10 pt-10 pb-20">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">🎟️ Available Showtimes</h2>

        {tickets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket, index) => {
              const show = ticket?.Screens?.[0]?.ShowTimes?.[0];

              if (!show) return null;

              return (
                <div
                  key={show.SessionId || index}
                  className="bg-gray-800 hover:bg-gray-700 transition duration-300 p-6 rounded-xl shadow-xl border border-gray-600"
                >
                  <h3 className="text-xl font-bold text-red-400 mb-4">{show.CinemaName}</h3>
                  <p className="text-sm text-gray-400 mb-2">Experience: {show.ExperienceString || "Standard"}</p>
                  <p className="text-sm text-gray-400 mb-4">Time: {show.ShowTime || "N/A"}</p>
                  <button
                    onClick={() => ticketHandle(show.SessionId, show.CinemaId)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition-all"
                  >
                    Book Now 🎫
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 text-center text-lg mt-10">No showtimes available for the selected date.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;
