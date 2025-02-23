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
    <div className="bg-purple-400 h-[24rem] flex justify-center items-center">
     <iframe
  width="100%"
  height="100%"
  src="https://www.youtube.com/embed/77vRyWNqZjM?si=UX-QN4lGEuoOmaz9&autoplay=1"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>

    </div>
  );
};

export default FirstContainer;
