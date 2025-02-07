import React, { useState } from "react";
import { motion } from "framer-motion";

const challenges = [
  { id: 1, title: "Eisenhower Matrix", description: "A prioritization system that categorizes tasks into four quadrants: Important & Urgent, Important but Not Urgent, Not Important but Urgent, and Not Important & Not Urgent. This helps in focusing on what truly matters and eliminating time-wasters.", duration: "7 Days", participants: 1500 },
  { id: 2, title: "80/20 Rule", description: "Also known as the Pareto Principle, this technique states that 80% of results come from 20% of efforts. By identifying the most critical 20% of tasks, you can maximize efficiency and productivity.", duration: "5 Days", participants: 1000 },
  { id: 3, title: "1-3-5 Method", description: "A structured way to plan daily tasks by completing 1 major task, 3 medium tasks, and 5 small tasks each day. This method helps maintain productivity without overwhelming yourself.", duration: "10 Days", participants: 900 },
  { id: 4, title: "Deep Work", description: "A technique for achieving intense focus by working without distractions for extended periods. Deep Work helps boost creativity, problem-solving skills, and overall efficiency.", duration: "7 Days", participants: 1200 },
  { id: 5, title: "Eat Your Frog", description: "A concept from Brian Tracy's book, this method suggests tackling your hardest or most important task first thing in the morning. By doing so, you eliminate procrastination and build momentum for the rest of the day.", duration: "7 Days", participants: 1100 },
  { id: 6, title: "Pomodoro Challenge", description: "A time management technique where you work in focused 25-minute intervals (Pomodoros) followed by short breaks. This method helps maintain concentration and prevent burnout.", duration: "7 Days", participants: 800 }
];

const Challenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [bookmarked, setBookmarked] = useState([]);

  const handleSelect = (challenge) => {
    setSelectedChallenge(challenge);
    setProgress(0);
    setStreak(0);
  };

  const completeDay = () => {
    setProgress((prev) => Math.min(prev + 14.3, 100)); // 7-day challenge: ~14.3% per day
    setStreak((prev) => prev + 1);
    setXp((prev) => prev + 50);
  };

  const toggleBookmark = (challenge, e) => {
    e.stopPropagation(); // Prevent triggering challenge selection
    setBookmarked((prev) =>
      prev.includes(challenge.id) ? prev.filter((id) => id !== challenge.id) : [...prev, challenge.id]
    );
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 text-gray-900">
      <h1 className="text-3xl font-bold text-center text-[#2563eb] mb-6">Time Management Challenges</h1>

      {!selectedChallenge ? (
        <motion.div className="grid md:grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 border-2 border-[#2563eb] rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:shadow-xl hover:border-blue-700 hover:-translate-y-2 flex flex-col justify-between relative"
              onClick={() => handleSelect(challenge)}>
              <div>
                <h2 className="text-xl font-semibold text-[#2563eb]">{challenge.title}</h2>
                <p className="text-sm mt-2 text-gray-700">{challenge.description}</p>
              </div>
              <div className="mt-4 p-3 bg-[#2563eb] text-white rounded-md shadow-inner w-full flex flex-col items-center">
                <p className="text-sm font-semibold">Duration: {challenge.duration}</p>
                <p className="text-sm">Participants: {challenge.participants}</p>
                <button
                  className={`mt-3 px-4 py-2 rounded-md text-white transition-all ${bookmarked.includes(challenge.id) ? 'bg-green-500 hover:bg-green-600' : 'bg-[#e5e7eb] hover:bg-[#d1d5db] text-gray-900'}`}
                  onClick={(e) => toggleBookmark(challenge, e)}
                >
                  {bookmarked.includes(challenge.id) ? "Bookmarked ✓" : "Bookmark"}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="p-6 border-2 border-[#2563eb] rounded-lg shadow-lg flex flex-col min-h-[400px]">
          <button className="mb-4 text-sm text-[#2563eb] underline self-start" onClick={() => setSelectedChallenge(null)}>← Back</button>
          <h2 className="text-2xl font-semibold text-[#2563eb]">{selectedChallenge.title}</h2>
          <p className="mt-2 flex-grow">{selectedChallenge.description}</p>
          <div className="mt-auto p-4 bg-[#2563eb] text-white rounded-md shadow-inner w-full">
            <p className="text-sm font-semibold">Duration: {selectedChallenge.duration}</p>
            <p className="text-sm">Participants: {selectedChallenge.participants}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <motion.div className="bg-[#2563eb] h-4 rounded-full" style={{ width: `${progress}%` }} animate={{ width: `${progress}%` }}></motion.div>
            </div>
            <p className="mt-2">{progress.toFixed(1)}% Completed</p>
            <button className="mt-4 px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1e4bb8] transition-all" onClick={completeDay}>Complete Today's Task</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;
