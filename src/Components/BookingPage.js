import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

const BookingPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); 
  const navigate = useNavigate();
  const ticketHandle = (sessionId) => {
    navigate(`/TicketDetail/${movieId}/${sessionId}`);
  };
  

  // Convert minutes to hours and minutes
  const convertToHoursMinutes = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes} min`;
  };

  // Format ShowTime to a readable format
  const formatShowTime = (showtime) => {
    if (!showtime) return "N/A";
    const date = new Date(showtime);
    return date.toLocaleString();
  };

  // Fetch movie details
  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `https://api_new.cinepolisindia.com/api/movies/movie-details-new-test/${movieId}/?movie_id=${movieId}&city_id=9&isVip=N`
      );
      const json = await response.json();
      if (json?.data?.length > 0) {
        setDetails(json.data[0]);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch showtimes based on selected date
  const fetchTheaterDetails = async (date) => {
    const showtimesApi = `https://api_new.cinepolisindia.com/api/movies/show-times/${movieId}/?request_type=get-show-times&show_date=${date}&movie_id=${movieId}&city_id=9&experience=&isVip=N`;
    
    try {
      const data = await fetch(showtimesApi);
      const json = await data.json();
      setTickets(json.data);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  // Fetch showtimes when selected date changes
  useEffect(() => {
    fetchTheaterDetails(selectedDate);
  }, [movieId, selectedDate]);

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
        {/* Background Banner with Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <img
          src={details?.movie_image_url_1}
          alt={details?.Title}
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>

      {/* Movie Content */}
      <div className="relative z-10 px-10 pt-10">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col md:flex-row gap-6">
          {/* Movie Poster */}
          <div className="w-[250px] flex-shrink-0 mx-auto md:mx-0">
            <img
              src={details?.movie_image_url_1}
              alt={details?.Title}
              className="w-full rounded-lg shadow-lg border-2 border-gray-700"
            />
          </div>

          {/* Movie Details */}
          <div className="flex flex-col justify-between w-full">
            <div>
              <h1 className="text-4xl font-semibold text-white">{details?.Title}</h1>
              <p className="text-gray-400 mt-2">{convertToHoursMinutes(details?.run_time)}</p>
              <p className="text-gray-300 mt-2"><strong>Genre:</strong> {details?.genre || "N/A"}</p>
              <p className="text-gray-300 mt-2"><strong>Release Date:</strong> {details?.movie_release_date || "N/A"}</p>
              <p className="text-gray-300 mt-2"><strong>Languages:</strong> {Array.isArray(details?.movie_language) ? details?.movie_language.join(", ") : details?.movie_language || "N/A"}</p>
              <p className="text-gray-300 mt-2"><strong>Formats:</strong> {Array.isArray(details?.m_movie_format_name) ? details?.m_movie_format_name.join(", ") : details?.m_movie_format_name || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Movie Synopsis */}
        <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-white">Synopsis</h2>
          <p className="text-gray-300 mt-2">{details?.Synopsis || "No synopsis available."}</p>
        </div>
      </div>

      {/* Date Picker */}
      <div className="relative z-10 px-10 pt-6">
        <label className="block text-gray-300 text-lg mb-2">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Ticket Showtimes */}
    {/* Ticket Showtimes */}
<div className="relative z-10 px-10 pt-10">
  <h2 className="text-3xl font-semibold text-white mb-6 text-center">🎟️ Available Showtimes</h2>

  {tickets.length > 0 ? (
    tickets.map((ticket, index) => (
      <div
        key={ticket?.SessionId || index}
        className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6 transition-all duration-300 hover:scale-105"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Cinema Details */}
          <div className="w-full md:w-2/3">
            <h3 className="text-2xl font-semibold text-red-500">{ticket?.Screens[0]?.ShowTimes[0]?.CinemaName}</h3>
            <p className="text-gray-300 mt-1">{ticket?.Screens[0]?.ShowTimes[0]?.cinema_address}</p>
            <p className="text-gray-400 mt-2"><strong>Seats Available:</strong> {ticket?.Screens[0]?.ShowTimes[0]?.SeatsAvailable}</p>
            <p className="text-gray-400 mt-1"><strong>Showtime:</strong> {formatShowTime(ticket?.Screens[0]?.ShowTimes[0]?.Showtime)}</p>
          </div>

          {/* Book Now Button */}
          <div className="w-full md:w-1/3 flex justify-center mt-4 md:mt-0">
          <button
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full"
  onClick={() => ticketHandle(ticket?.Screens[0]?.ShowTimes[0]?.SessionId)}
>
  Book Now
</button>

          </div>
        </div>
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
