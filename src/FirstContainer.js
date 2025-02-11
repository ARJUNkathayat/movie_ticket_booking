import React, { useEffect } from "react";
import { API_OPTIONs } from "./utils/constants";
import { db } from "./utils/firebase"; 
import { collection, addDoc } from "firebase/firestore";

const FirstContainer = () => {
  const getTitleMovie = async () => {
    try {
      // ✅ Fetch TMDB API data
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        { 
          ...API_OPTIONs, 
          mode: "cors",  // ✅ Enable CORS mode
          credentials: "omit" // ✅ Prevents sending cookies
        }
      );
      const json = await response.json();
      
      console.log("Fetched Data:", json.results);

      // ✅ Reference Firestore collection
      const moviesRef = collection(db, "movies");

      // ✅ Store movies in Firestore
      json.results.forEach(async (movie) => {
        await addDoc(moviesRef, {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          timestamp: new Date(),
        });
      });

      console.log("Movies added to Firebase successfully!");
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
