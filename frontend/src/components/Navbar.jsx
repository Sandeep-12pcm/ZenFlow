import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 shadow-md transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          ZenFlow
        </Link>

        <div className="flex space-x-6">
          <Link to="/" className="text-white relative after:content-[''] after:absolute after:left-1/2 after:bottom-[10px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">
            Home
          </Link>

          <Link to="/challenges" className="text-white relative after:content-[''] after:absolute after:left-1/2 after:bottom-[10px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">
            Challenges
          </Link>

          {/* Features Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="text-white relative after:content-[''] after:absolute after:left-1/2 after:bottom-[2px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">Features ▾</button>

            {dropdownOpen && (
              <div className="absolute mt-2 bg-white text-black shadow-lg p-2 rounded-lg">
                <Link to="/gratitude-journal" className="block px-4 py-2 hover:bg-gray-200">Gratitude Journal</Link>
                <Link to="/pomodoro-timer" className="block px-4 py-2 hover:bg-gray-200">Pomodoro Timer</Link>
                <Link to="/reading" className="block px-4 py-2 hover:bg-gray-200">Reading</Link>
                <Link to="/meditation" className="block px-4 py-2 hover:bg-gray-200">Meditation</Link>
                <Link to="/todo" className="block px-4 py-2 hover:bg-gray-200">To-Do</Link>
                <Link to="/habit-replacer" className="block px-4 py-2 hover:bg-gray-200">Habit Replacer</Link>
              </div>
            )}
          </div>

          <Link to="/community" className="text-white relative after:content-[''] after:absolute after:left-1/2 after:bottom-[10px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">
            Community
          </Link>

          <Link to="/progress" className="text-white relative after:content-[''] after:absolute after:left-1/2 after:bottom-[10px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">
            Progress
          </Link>

          <Link to="/profile" className="text-white relative after:content-[''] after:absolute after:left-1/2 after:bottom-[10px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">
            Profile
          </Link>

          <Link to="/signup" className="text-white border px-3 py-1 rounded-md hover:bg-white hover:text-blue-600">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
