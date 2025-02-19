import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import debounce from "lodash.debounce";

const BookingPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const navigate = useNavigate();

  const ticketHandle = (sessionId, CinemaId) => {
    navigate(`/TicketDetail/${movieId}/${sessionId}/${CinemaId}`);
  };

  const fetchMovieDetails = useCallback(
    debounce(async () => {
      try {
        const response = await fetch(
          `https://api_new.cinepolisindia.com/api/movies/movie-details-new-test/${movieId}/?movie_id=${movieId}&city_id=9&isVip=N`
        );
        if (!response.ok) throw new Error("Too Many Requests");
        const json = await response.json();
        if (json?.data?.length > 0) {
          setDetails(json.data[0]);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [movieId]
  );

  const fetchTheaterDetails = useCallback(
    debounce(async (date) => {
      try {
        const response = await fetch(
          `https://api_new.cinepolisindia.com/api/movies/show-times/${movieId}/?request_type=get-show-times&show_date=${date}&movie_id=${movieId}&city_id=9&experience=&isVip=N`
        );
        if (!response.ok) throw new Error("Too Many Requests");
        const json = await response.json();
        setTickets(json.data);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
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
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (!details) {
    return <div className="text-white text-center mt-10">Movie details not found.</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <div className="relative">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <img src={details?.movie_image_url_1} alt={details?.Title} className="w-full h-[400px] object-cover rounded-lg" />
      </div>

      <div className="relative z-10 px-10 pt-10">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col md:flex-row gap-6">
          <div className="w-[250px] flex-shrink-0 mx-auto md:mx-0">
            <img src={details?.movie_image_url_1} alt={details?.Title} className="w-full rounded-lg shadow-lg border-2 border-gray-700" />
          </div>
          <div className="flex flex-col justify-between w-full">
            <h1 className="text-4xl font-semibold text-white">{details?.Title}</h1>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-10 pt-6">
        <label className="block text-gray-300 text-lg mb-2">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="relative z-10 px-10 pt-10">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">🎟️ Available Showtimes</h2>
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <div key={ticket?.SessionId || index} className="bg-gray-800 bg-opacity-75 backdrop-blur-md p-6 rounded-xl shadow-xl mb-6">
              <h3 className="text-2xl font-bold text-red-500">{ticket?.Screens[0]?.ShowTimes[0]?.CinemaName}</h3>
              <button onClick={() => ticketHandle(ticket?.Screens[0]?.ShowTimes[0]?.SessionId, ticket?.Screens[0]?.ShowTimes[0]?.CinemaId)}>🎟️ Book Now</button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center text-lg">No showtimes available for today.</p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
