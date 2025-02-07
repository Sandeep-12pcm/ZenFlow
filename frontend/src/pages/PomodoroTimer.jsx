import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";



const PomodoroTimer = () => {
  const navigate = useNavigate();

  // State hooks for timer and settings
  const [workTime, setWorkTime] = useState(25 * 60); // Default work time
  const [breakTime, setBreakTime] = useState(5 * 60); // Default break time
  const [timer, setTimer] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [workDescription, setWorkDescription] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [audio, setAudio] = useState(null);
  const [timerName, setTimerName] = useState("Pomodoro Timer");
  const [coins, setCoins] = useState(0);
  const [history, setHistory] = useState([]);
  const [focusMode, setFocusMode] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [progress, setProgress] = useState(0);

  // Effect hook for audio control
  useEffect(() => {
    if (audio) {
      isActive && !isPaused ? audio.play() : audio.pause();
    }
  }, [audio, isActive, isPaused]);

  // Function to handle start and stop of the timer
  const handleStartStop = () => {
    setIsActive(!isActive);
    setIsPaused(!isPaused);
  };

  // Function to reset the timer
  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setTimer(workTime);
    setProgress(0);
    if (audio) audio.pause();
  };

  // Function to handle music URL change
  const handleMusicUrlChange = (event) => setMusicUrl(event.target.value);

  // Function to play music
  const handleStartMusic = () => {
    const newAudio = new Audio(musicUrl);
    setAudio(newAudio);
    if (newAudio) newAudio.play();
  };

  // Function to handle work description input
  const handleWorkDescriptionChange = (event) => setWorkDescription(event.target.value);

  // Function to log progress
  const handleProgress = useCallback(() => {
    const date = new Date();
    const progressData = {
      description: workDescription,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      coins,
    };
    setHistory((prevHistory) => [...prevHistory, progressData]);
    navigate("/progress", { state: { progressData } });
  }, [workDescription, coins, navigate]);

  // Timer countdown effect
  useEffect(() => {
    if (isActive && !isPaused) {
      const interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
          setProgress(((workTime - timer) / workTime) * 100);
        } else {
          clearInterval(interval);
          setIsActive(false);
          setIsPaused(true);
          setCoins(coins + 1);
          handleProgress();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, isPaused, timer, coins, handleProgress]);

  // Handlers for work and break time changes
  const handleBreakTimeChange = (event) => {
    const newBreakTime = event.target.value * 60;
    setBreakTime(newBreakTime);
    if (!isActive && !isPaused) setTimer(newBreakTime); // Update timer if running
  };

  const handleWorkTimeChange = (event) => {
    const newWorkTime = event.target.value * 60;
    setWorkTime(newWorkTime);
    setTimer(newWorkTime); // Update timer immediately when work time changes
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Format time in MM:SS format
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} justify-between`}>
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-between p-6 border-r border-gray-300 space-y-4">
        <div className="py-3 flex flex-col justify-center space-y-20">
          <h1 className=" text-6xl font-extrabold text-center font-[Bebas+Neue] text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-blue-500">
            Promodoro Timer 🍵
          </h1>
        

        <div className="w-full max-w-md space-y-4">
          <input
            type="text"
            placeholder="Enter Music URL"
            value={musicUrl}
            onChange={handleMusicUrlChange}
            className={`p-3 border border-gray-300 rounded-md w-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
          />
          <button onClick={handleStartMusic} className="bg-[#2563eb] text-white px-6 py-2 rounded-md w-full shadow-md hover:bg-blue-700">
            Play Music
          </button>
        </div>

        </div>

        <div className="flex space-x-4 w-full">
          <button onClick={() => navigate("/progress")} className="bg-purple-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-purple-700 w-full">
            View Report
          </button>
          <button onClick={toggleDarkMode} className="bg-yellow-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-yellow-700 w-full">
            Toggle Light Mode
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-between p-6 space-y-6">
        {/* Work Time and Break Time Inputs */}
        <div className="flex space-x-6 w-full justify-center">
          <div className="w-1/2 flex flex-col items-center space-y-2">
            <button 
              onClick={() => document.getElementById('workTime').focus()}
              className="flex items-center space-x-3 bg-[#2563eb] text-gray-800 px-6 py-3 rounded-lg shadow-lg hover:bg-[#8bc34a] transition-all duration-300 font-['Poppins']"
            >
              <i className="fas fa-briefcase text-xl"></i>
              <span className="font-semibold">Work Time:</span>
              <input
                type="number"
                id="workTime"
                value={workTime / 60}
                onChange={handleWorkTimeChange}
                className="w-16 bg-transparent border-b-2 border-white text-center focus:outline-none font-bold text-lg"
              />
              <span className="text-sm">min</span>
            </button>
          </div>
          

          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={() => document.getElementById('breakTime').focus()}
              className="flex items-center space-x-3 bg-[#2563eb] text-gray-800 px-6 py-3 rounded-lg shadow-lg hover:bg-[#8bc34a] transition-all duration-300 font-['Poppins']"
            >
              <i className="fas fa-coffee text-xl"></i>
              <span className="font-semibold">Break Time:</span>
              <input
                type="number"
                id="breakTime"
                value={breakTime / 60}
                onChange={handleBreakTimeChange}
                className="w-16 bg-transparent border-b-2 border-white text-center focus:outline-none font-bold text-lg"
              />
              <span className="text-sm">min</span>
            </button>
          </div>
        </div>

        {/* Timer Display */}
        <div className="flex flex-col items-center">
          <div className="text-7xl font-digital mt-6 tracking-wider bg-gray-800 text-green-400 px-8 py-4 rounded-lg shadow-inner" style={{
            fontFamily: "Oxanium",
            textShadow: "0 0 5px rgba(74, 222, 128, 0.5)"
          }}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>

        {/* Timer Controls */}
        <div className="mt-6 flex space-x-4">
          <button onClick={handleStartStop} className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700">
            {isActive ? "Pause" : "Start"}
          </button>
          <button onClick={handleReset} className="bg-red-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700">
            Reset
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full mt-6 bg-gray-300 rounded-full h-2.5">
          <div
            className="bg-[#2563eb] h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Focus Mode */}
        <div className="mt-6">
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`${focusMode ? "bg-red-600" : "bg-yellow-600"} text-white px-6 py-3 rounded-md shadow-md hover:bg-opacity-80`}
          >
            {focusMode ? "Exit Focus Mode" : "Start Focus Mode"}
          </button>
        </div>

        {/* Show Analytics */}
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-purple-700"
        >
          {showAnalytics ? "Hide Analytics" : "Show Analytics"}
        </button>

        {/* Analytics Section */}
        {showAnalytics && (
          <div className="mt-6 bg-gray-200 p-4 rounded-md shadow-md w-full">
            <h2 className="text-xl font-semibold">Pomodoro Analytics</h2>
            <ul>
              {history.map((item, index) => (
                <li key={index} className="text-sm">
                  {item.date} - {item.time} - {item.description} - Coins: {item.coins}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
