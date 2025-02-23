import React, { useState } from "react";
import Header from "./Header";
import FirstContainer from "./FirstContainer";
import SecondContainer from "./SecondContainer";
import LoginPage from "./LoginPage";

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
        </>
      )}
    </div>
  );
};

export default MainPage;
