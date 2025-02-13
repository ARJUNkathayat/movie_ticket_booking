import React, { useEffect } from "react";
import Header from "./Components/Header";
import FirstContainer from "./FirstContainer";

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
    <div className="">
      <Header />
      <FirstContainer />
    </div>
  );
}

export default App;
