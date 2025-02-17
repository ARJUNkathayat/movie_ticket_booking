import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Components/MainPage";
import BookingPage from "./Components/BookingPage";
import TicketDetail from "./Components/TicketDetail";


function App() {
  async function getData() {
    const response = await fetch("http://localhost:5000/movies"); // Fetch from backend
    const json = await response.json();
    console.log(json);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/book-ticket/:movieId" element={<BookingPage />} />
        <Route path="/TicketDetail/:movieId/:sessionId/:CinemaId" element={<TicketDetail />} />


      </Routes>
    </Router>
  );
}

export default App;
