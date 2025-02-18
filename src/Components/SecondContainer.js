import React, { useEffect, useState } from "react";
import MovieCards from "./MovieCards";

const SecondContainer = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const movieList = async () => {
    try {
      const response = await fetch(
        "https://api_new.cinepolisindia.com/api/movies/now-playing-filtered/?movie_language_id=&movie_genre_id=&city_id=9"
      );
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      const json = await response.json();
      console.log("Movie Data:", json.data);
      
      if (json?.data && Array.isArray(json.data)) {
        setMovies(json.data);
      } else {
        setMovies([]); // Prevents errors if data is not an array
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    movieList();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-2xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">
        ❌ Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-10">
      <h1 className="text-white text-3xl font-bold text-center mb-6">
        🎬 Now Playing
      </h1>
      {movies.length === 0 ? (
        <p className="text-center text-white text-xl">No movies available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
          {movies.map((movie) => (
            <MovieCards key={movie.movie_id} mov={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SecondContainer;
