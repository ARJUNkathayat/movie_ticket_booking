import React, { useState } from "react";
import Header from "./Header";
import FirstContainer from "./FirstContainer";
import SecondContainer from "./SecondContainer";
import LoginPage from "./LoginPage";
import Footer from "./Footer";

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {!isLoggedIn ? (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <>
          <Header />
          <FirstContainer />
          <SecondContainer />
          <Footer/>
        </>
      )}
    </div>
  );
};

export default MainPage;
