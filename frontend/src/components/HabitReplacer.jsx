import { useState } from "react";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registering Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const HabitReplacer = () => {
  const [habit, setHabit] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [habitHistory, setHabitHistory] = useState([]);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [totalTimeSaved, setTotalTimeSaved] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(false);

  // Motivational quotes for the "Try Instead" box
  const motivationalQuotes = [
    "Small steps lead to big changes! 🌟",
    "Replace habits, transform your life! 💪",
    "Your future self will thank you! 🚀",
    "Focus on progress, not perfection! 🎯",
  ];
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  // Habit replacement suggestions
  const habitSuggestions = {
    "Social Media": "Read a book 📖",
    "Video Games": "Go for a walk 🚶",
    "Binge-Watching": "Try a workout session 💪",
    "Smoking": "Do deep breathing exercises 🧘",
    "Procrastination": "Start a 5-min Pomodoro task ⏳",
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habit || !timeSpent) return;

    const newReplacement = habitSuggestions[habit] || "Learn something new! 🎯";
    const timeSpentNumber = parseFloat(timeSpent);

    setSuggestion(newReplacement);
    setHabitHistory([...habitHistory, { habit, timeSpent: timeSpentNumber, replacement: newReplacement }]);
    setTotalTimeSpent(totalTimeSpent + timeSpentNumber);
    setTotalTimeSaved(totalTimeSaved + timeSpentNumber);
  };

  // Doughnut Chart Data
  const data = {
    labels: ["Time Spent", "Time Saved"],
    datasets: [
      {
        data: [totalTimeSpent, totalTimeSaved],
        backgroundColor: ["#ff5c5c", "#2563eb"],
        hoverOffset: 6,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      {/* Main Section - Fixed Height */}
      <div className="w-full lg:w-3/4 flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-6">
        
        {/* Left Section - Fixed Height */}
        <div className="w-full lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md h-[320px] flex flex-col justify-between">
          <h1 className="text-2xl font-bold text-[#2563eb]">Habit Replacer</h1>
          <p className="text-gray-600">Replace bad habits with productive activities.</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <label className="block text-gray-700 font-semibold">Select a Habit:</label>
            <select
              className="w-full p-1.5 border border-gray-300 rounded focus:ring-[#2563eb]"
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              required
            >
              <option value="">Choose a Habit</option>
              {Object.keys(habitSuggestions).map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>

            <label className="block text-gray-700 font-semibold">Time Spent (in hours):</label>
            <input
              type="number"
              className="w-full p-1.5 border border-gray-300 rounded focus:ring-[#2563eb]"
              value={timeSpent}
              onChange={(e) => setTimeSpent(e.target.value)}
              required
            />

            <button type="submit" className="w-full bg-[#2563eb] text-white font-semibold p-2 rounded hover:bg-blue-700">
              Suggest a Replacement
            </button>
          </form>
        </div>

        {/* Right Section - Fixed Height */}
        <div className="w-full lg:w-1/2 bg-green-100 p-6 rounded-lg shadow-md h-[320px] flex flex-col justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-yellow-500 text-3xl">💡</span>
            <h2 className="text-xl font-semibold text-green-700">Try this instead:</h2>
          </div>
          {suggestion ? (
            <p className="text-lg text-gray-800 font-semibold">{suggestion}</p>
          ) : (
            <p className="text-gray-500 italic">No suggestion yet...</p>
          )}

          <p className="text-gray-600 italic mt-2">{randomQuote}</p>

          {/* Task Completion Checkbox */}
          {suggestion && (
            <div className="mt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-[#2563eb]"
                  checked={taskCompleted}
                  onChange={() => setTaskCompleted(!taskCompleted)}
                />
                <span className="text-gray-700 font-semibold">I completed this task</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Below Sections - History & Progress (Split Layout) */}
      {taskCompleted && (
        <div className="w-full lg:w-3/4 flex flex-col lg:flex-row items-start mt-6 space-y-6 lg:space-y-0 lg:space-x-6">
          
          {/* Left - Habit History with Scroll */}
          <div className="w-full lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md h-[320px]">
            <h2 className="text-xl font-bold text-[#2563eb] mb-2">Your Habit History</h2>
            <div className="h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              <ul className="space-y-3">
                {habitHistory.map((entry, index) => (
                  <li key={index} className="bg-white p-3 rounded shadow-md flex justify-between">
                    <span className="text-gray-700 font-semibold">{entry.habit}</span>
                    <span className="text-green-600">{entry.replacement}</span>
                    <span className="text-gray-500">⏳ {entry.timeSpent} hrs</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - Progress Graph */}
          <div className="w-full lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md h-[320px] flex flex-col items-center">
            <h2 className="text-xl font-bold text-[#2563eb] mb-4">Habit Replacement Progress</h2>
            <div className="w-[80%] h-[200px]">
              <Doughnut data={data} />
            </div>
          </div>
        </div>
      )}

      {/* Go Back Button */}
      <Link to="/" className="mt-6 text-[#2563eb] hover:underline">← Back to Home</Link>
    </div>
  );
};

export default HabitReplacer;
