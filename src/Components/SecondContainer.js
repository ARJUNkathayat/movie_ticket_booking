import React, { useEffect, useState } from "react";
import MovieCards from "./MovieCards";

const SecondContainer = () => {
  const [movies, setMovies] = useState([]);

  const movieList = async () => {
    try {
      const response = await fetch(
        "https://api_new.cinepolisindia.com/api/movies/now-playing-filtered/?movie_language_id=&movie_genre_id=&city_id=9"
      );
      const json = await response.json();
      console.log("Movie Data:", json.data);
      setMovies(json.data || []); // Ensure it's an array to avoid map errors
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    movieList();
  }, []);

  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-10">
      <h1 className="text-white text-3xl font-bold text-center mb-6">
        Now Playing
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
        {movies.map((movie) => (
          <MovieCards key={movie.movie_id} mov={movie} />
        ))}
      </div>
    </div>
  );
};

export default SecondContainer;
