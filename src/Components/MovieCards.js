import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCards = ({ mov }) => {
  const navigate = useNavigate();

  const convertToHoursMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes} min`;
  };

  const watchTrailer = () => {
    window.open(mov.movie_trailer, "_blank");
  };

  const handleBookTicket = () => {
    navigate(`/book-ticket/${mov.ID}`);
  };

  return (
    <div className="relative group bg-white/5 text-white backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl hover:shadow-red-500/40 transition-transform duration-300 ease-in-out w-72 hover:scale-105 overflow-hidden">
      {/* Card shimmer glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#1e3a8a] via-[#6d28d9] to-[#1e3a8a] blur-xl opacity-25 group-hover:opacity-40 animate-pulse z-0" />
      <div className="relative z-10">
        <img
          src={mov.movie_image_url_1}
          alt={mov.movie_name}
          className="w-full h-96 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
        />
        <h1 className="text-xl font-bold mt-3">{mov.Title}</h1>
        <h3 className="text-sm text-gray-300">{mov.commmonLangaugesJoined}</h3>
        <h3 className="text-sm text-gray-400">{mov.m_movie_genre_name}</h3>
        <h3 className="text-sm text-gray-400">{convertToHoursMinutes(mov.run_time)}</h3>

        <div className="flex mt-4 justify-between space-x-4">
          <button
            onClick={watchTrailer}
            className="border-2 border-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-400 transition-all duration-300"
          >
            🎬 Watch Trailer
          </button>

          <button
            onClick={handleBookTicket}
            className="border-2 border-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-400 transition-all duration-300"
          >
            🎟️ Book Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCards;
