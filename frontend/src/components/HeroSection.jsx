import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
      <p className="text-lg mb-6">
        Your daily source of inspiration. Stay motivated with fresh quotes every day!
      </p>

      {/* Buttons for Login and Signup */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-lg transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
