import React, { useRef, useState } from "react";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginPage = ({ setIsLoggedIn }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );
        console.log("User Registered:", userCredential.user);
        alert("Account Created Successfully!");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );
        console.log("User Logged In:", userCredential.user);
        alert("Login Successful!");
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error:", error.code, error.message);
      alert(error.message);
    }
  };

  return (
    <div
      className="flex h-screen justify-center items-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/assortment-cinema-elements-red-background-with-copy-space_23-2148457848.jpg?t=st=1744177365~exp=1744180965~hmac=9a7463e4cc08a67f031840a99abcc668b46bd1125cc024a220e8f35a26c4484c&w=1380')",
      }}
    >
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 text-white p-8 sm:p-12 transition duration-300">
        <h2 className="text-4xl font-bold mb-6 text-center drop-shadow-md">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleAuth} className="space-y-6">
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-white/80"
          />

          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-white/80"
          />

          <button
            type="submit"
            className="w-full p-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition duration-200"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/80">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-300 hover:text-blue-400 cursor-pointer underline underline-offset-2"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
