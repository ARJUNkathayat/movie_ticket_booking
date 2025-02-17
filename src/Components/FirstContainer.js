import { useEffect, useState } from "react";

const FirstContainer = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((res) => res.json())
      .then((data) => {
        console.log("📢 Fetched Movies:", data);
        setMovies(data);
      })
      .catch((error) => console.error("❌ Error fetching movies:", error));
  }, []);


  

  return (
    <div className="bg-purple-400 h-[24rem]">
   
      <h1>Now Playing Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.ID}>
            <img
              src={movie.FilmNameUrl}
              alt={movie.Title}
              width="100"
              onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
            />
            <h3>{movie.Title}</h3>
            <p>Rating: {movie.rating}</p>
            <p>Language: {movie.commmonLangaugesJoined}</p>
            <p>Runtime: {movie.RunTime} min</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FirstContainer;
