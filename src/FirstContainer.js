import React, { useEffect } from "react";
import { API_OPTIONs } from "./utils/constants";

const FirstContainer = () => {
  const getTitleMovie = async () => {
    try {
      // ✅ TMDB API se data fetch karo
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONs
      );
      const json = await response.json();
      console.log("Fetched Data:", json.results);

      // ✅ Backend API ko data bhejo (MongoDB me save karne ke liye)
      const backendResponse = await fetch("http://localhost:5000/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movies: json.results }),
      });

      const result = await backendResponse.json();
      console.log("Backend Response:", result);

    } catch (error) {
      console.error("Error fetching or saving movie data:", error);
    }
  };

  useEffect(() => {
    getTitleMovie();
  }, []);

  return <div className="bg-purple-600 h-[27rem]"></div>;
};

export default FirstContainer;
