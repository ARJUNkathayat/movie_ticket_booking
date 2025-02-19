import React, { useRef } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        emailRef.current.value, 
        passwordRef.current.value
      );
      console.log("User Created:", userCredential.user);
      alert("Sign-Up Successful!");
    } catch (error) {
      console.error("Error:", error.code, error.message);
      alert(error.message);
    }
  };

  return (
    <div className='pt-36 flex h-screen bg-gray-900 justify-center items-center'>
      {/* Left Section with GIF */}
      <div className='hidden md:block ml-10 h-[32rem] w-[25rem] bg-red-50 rounded-lg shadow-lg flex justify-center items-center'>
        <img 
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2ZxdW5kanpibXdjMWpjMXcwMmljaDZ0aG5obXBxOTV6eXB3YnhqMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/icIr8rk03xQI6NS67S/giphy.gif" 
          alt="Cartoon Animation" 
          className="h-72 w-72 object-contain"
        />
      </div>

      {/* Right Section - Sign-Up Form */}
      <div className='p-10 w-[28rem] bg-gray-800 rounded-lg shadow-lg text-white'>
        <h2 className='text-3xl font-semibold mb-6'>Sign Up</h2>

        <form onSubmit={handleSignUp} className='flex flex-col space-y-4'>
          <input 
            type='text' 
            placeholder='Full Name' 
            className='p-3 rounded bg-gray-700 text-white focus:outline-none'
          />
          
          <input ref={emailRef}
            type='email' 
            placeholder='Email' 
            className='p-3 rounded bg-gray-700 text-white focus:outline-none'
          />
          
          <input ref={passwordRef}
            type='password' 
            placeholder='Password' 
            className='p-3 rounded bg-gray-700 text-white focus:outline-none'
          />

          <button 
            type="submit"
            className='p-3 bg-red-600 hover:bg-red-700 rounded text-white font-semibold'
          >
            Sign Up
          </button>

          <p className='text-center text-gray-400'>
            Already have an account? <a href='#' className='text-red-400 hover:underline'>Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
