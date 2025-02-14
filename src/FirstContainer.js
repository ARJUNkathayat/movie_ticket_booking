import { useEffect, useState } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div>
      <h1>Now Playing Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={movie.poster} alt={movie.title} width="100" />
            <h3>{movie.title}</h3>
            <p>Genre: {movie.genre}</p>
            <p>Language: {movie.language}</p>
            <p>Runtime: {movie.runtime} min</p>
            <a href={movie.trailer} target="_blank">Watch Trailer</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
