import React, { useRef } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = ({ setIsLoggedIn }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log("User Logged In:", userCredential.user);
      alert("Login Successful!");
      setIsLoggedIn(true); // Update state to show MainPage
    } catch (error) {
      console.error("Error:", error.code, error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 justify-center items-center">
      <div className="p-10 w-[28rem] bg-gray-800 rounded-lg shadow-lg text-white">
        <h2 className="text-3xl font-semibold mb-6">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-gray-700 text-white focus:outline-none"
          />

          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-gray-700 text-white focus:outline-none"
          />

          <button
            type="submit"
            className="p-3 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
