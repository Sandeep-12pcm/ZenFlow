import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { FaQuoteLeft } from "react-icons/fa";

import { fetchGratitudeEntries, addGratitudeEntry } from "../api";

const predefinedQuotes = [
  { text: "Gratitude turns what we have into enough.", author: "Anonymous" },

  {
    text: "The more grateful I am, the more beauty I see.",
    author: "Mary Davis",
  },

  {
    text: "Start each day with a positive thought and a grateful heart.",
    author: "Roy T. Bennett",
  },

  {
    text: "Happiness is itself a kind of gratitude.",
    author: "Joseph Wood Krutch",
  },

  {
    text: "Gratitude is the fairest blossom that springs from the soul.",
    author: "Henry Ward Beecher",
  },
];

const GratitudeJournal = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });

  const [userQuotes, setUserQuotes] = useState([]);

  const [newQuote, setNewQuote] = useState("");

  useEffect(() => {
    getRandomQuote();

    loadUserQuotes();
  }, []);

  const loadUserQuotes = async () => {
    const entries = await fetchGratitudeEntries();

    setUserQuotes(entries);
  };

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * predefinedQuotes.length);

    setQuote(predefinedQuotes[randomIndex]);
  };

  const handleAddQuote = async () => {
    if (newQuote.trim() !== "") {
      const addedQuote = await addGratitudeEntry(newQuote);

      if (addedQuote) {
        setUserQuotes((prev) => [addedQuote, ...prev]);

        setNewQuote("");
      }
    }
  };

  return (
    <div className="min-h-screen p-12 text-white bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white text-gray-800 p-10 rounded-2xl shadow-xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="p-6 text-center rounded-md mb-8 text-xl"
        >
          <FaQuoteLeft className="text-indigo-500 text-5xl inline-block mb-4" />

          <p className="font-semibold text-2xl">{quote.text}</p>

          <p className="text-lg text-gray-600">- {quote.author}</p>
        </motion.div>

        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="What are you grateful for today?"
            className="flex-1 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-lg"
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
          />

          <button
            onClick={handleAddQuote}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg"
          >
            Add
          </button>
        </div>

        {userQuotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 bg-gray-100 p-6 rounded-md text-gray-800 shadow-md"
          >
            <h3 className="text-xl font-bold mb-4">You are grateful for:</h3>

            <div className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide p-2">
              {userQuotes.map((q) => (
                <div
                  key={q._id}
                  className="relative min-w-[300px] p-4 bg-indigo-100 rounded-xl shadow-lg"
                >
                  <p className="text-lg font-semibold">"{q.text}"</p>

                  <p className="text-gray-500 text-sm self-end mt-2">
                    {new Date(q.date).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GratitudeJournal;
