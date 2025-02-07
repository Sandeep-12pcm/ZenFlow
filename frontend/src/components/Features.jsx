import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { name: "Gratitude Journal", path: "/gratitude-journal", color: "bg-blue-500" },
  { name: "Pomodoro Timer", path: "/pomodoro-timer", color: "bg-red-500" },
  { name: "To-Do", path: "/to-do", color: "bg-green-500" },
  { name: "Meditation", path: "/meditation", color: "bg-yellow-500" },
  { name: "Reading", path: "/reading", color: "bg-purple-500" },
  { name: "Habit Replacer", path: "/habit-replacer", color: "bg-pink-500" },
];

const Features = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Explore Our Features</h2>
        <p className="text-gray-600 mt-2">Enhance your well-being with these powerful tools.</p>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`rounded-xl p-6 text-white text-center shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${feature.color}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => navigate(feature.path)}
          >
            <h3 className="text-2xl font-semibold">{feature.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
