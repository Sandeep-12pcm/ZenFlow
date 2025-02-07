import React, { useState, useEffect, useRef } from "react";

const MeditationGuide = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mood, setMood] = useState("Relaxing");
  const audioRef = useRef(null);

  // Color scheme for each mood, all related to blue
  const moodBackground = {
    Relaxing: "bg-gradient-to-r from-[#4facfe] to-[#00f2fe]", // Light blue gradient
    Energizing: "bg-gradient-to-r from-[#1e3c72] to-[#2a5298]", // Deep blue gradient
    Healing: "bg-gradient-to-r from-[#89f7fe] to-[#66a6ff]", // Soft aqua blue gradient
    DeepFocus: "bg-gradient-to-r from-[#243b55] to-[#141e30]", // Dark navy gradient
  };

  const moodButtonStyle = {
    Relaxing: "bg-blue-400 hover:bg-blue-500",
    Energizing: "bg-blue-600 hover:bg-blue-700",
    Healing: "bg-blue-300 hover:bg-blue-400",
    DeepFocus: "bg-blue-800 hover:bg-blue-900",
  };

  useEffect(() => {
    audioRef.current = new Audio("/sounds/meditation-music.mp3");
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
      audioRef.current.loop = true;
    }
    setIsPlaying(!isPlaying);
  };

  const startMeditation = () => {
    if (!isPlaying) {
      toggleMusic();
    }
    //alert("Meditation started. Relax and focus.");
  };

  const stopMeditation = () => {
    if (isPlaying) {
      toggleMusic();
    }
   // alert("Meditation stopped.");
  };

  return (
    <div
      className={`h-screen flex flex-col items-center justify-center p-6 ${moodBackground[mood]} text-white transition-all duration-500 ease-in-out relative`}
    >
      {/* Floating Circle Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-12 h-12 bg-white bg-opacity-20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 12 + 8}s`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Mood Selection */}
      <div className="z-10 text-center">
        {/* <h1 className="text-4xl font-bold mb-4">Meditation Guide</h1> */}
        <h3 className="text-lg font-medium mb-2">Select Your Mood:</h3>
        <select
          className="p-3 text-black rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option>Relaxing</option>
          <option>Energizing</option>
          <option>Healing</option>
          <option>DeepFocus</option>
        </select>
      </div>

      {/* Meditation Message */}
      {/* <p className="mt-8 text-xl font-light italic z-10">
        Let the tranquility of blue guide your mind.
      </p> */}

      {/* Enhanced Breathing Animation */}
      <div className="mt-10 w-48 h-48 bg-white bg-opacity-30 rounded-full flex items-center justify-center animate-breathe z-10 shadow-lg">
        <div className="w-24 h-24 bg-white bg-opacity-40 rounded-full animate-pulse"></div>
      </div>

      {/* Start/Stop Button */}
      <button
        className={`mt-10 px-10 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-110 shadow-xl ${moodButtonStyle[mood]} z-10`}
        onClick={isPlaying ? stopMeditation : startMeditation}
      >
        {isPlaying ? "Stop Meditation" : "Start Meditation"}
      </button>

      {/* Footer */}
      {/* <footer className="absolute bottom-4 text-sm text-white opacity-70">
        Breathe in, breathe out, and embrace the calm of blue.
      </footer> */}

      {/* Add Tailwind Keyframe Animations */}
      {/* <style jsx>{`
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
        .animate-breathe {
          animation: breathe 5s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style> */}
    </div>
  );
};

export default MeditationGuide;
