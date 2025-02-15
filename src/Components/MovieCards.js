import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCards = ({ mov }) => {
  const navigate = useNavigate();

  const convertToHoursMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes} min`;
  };

  const handleBookTicket = () => {
    navigate(`/book-ticket/${mov.ID}`); // Pass movieId in the URL
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out w-72">
      <img
        src={mov.movie_image_url_1}
        alt={mov.movie_name}
        className="w-full h-96 object-cover rounded-lg shadow-md"
      />
      <h1 className="text-lg font-bold mt-2">{mov.Title}</h1>
      <h3 className="text-sm text-gray-400">{mov.commmonLangaugesJoined}</h3>
      <h3 className="text-sm text-gray-400">{mov.m_movie_genre_name}</h3>
      <h3 className="text-sm text-gray-400">{convertToHoursMinutes(mov.run_time)}</h3>

      <div className="flex mt-4 justify-between space-x-4">
        <button className="border-2 border-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:shadow-blue-500 hover:shadow-md">
          🎬 Watch Trailer
        </button>
        <button
          onClick={handleBookTicket}
          className="border-2 border-red-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:shadow-red-500 hover:shadow-md"
        >
          🎟️ Book Ticket
        </button>
      </div>
    </div>
  );
};

export default MovieCards;
