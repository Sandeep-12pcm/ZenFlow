import React from "react";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const mockUser = {
    displayName: "ZenFlow User",

    email: "user@gmail.com",

    photoURL: "https://tse2.mm.bing.net/th?id=OIP.3YFWg1dLNAGBR8KRGlEVzgAAAA&pid=Api&P=0&h=180",

    stats: {
      meditationSessions: 12,

      completedTasks: 47,

      gratitudeEntries: 31,

      streakDays: 7,

      joinedDate: "March 2024",
    },
  };

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Profile Header */}

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={mockUser.photoURL}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />

                <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {mockUser.displayName}
                </h1>

                <p className="text-blue-100">{mockUser.email}</p>

                <div className="mt-4 flex gap-4">
                  <span className="bg-blue-400/30 text-white px-4 py-1 rounded-full text-sm">
                    Member since {mockUser.stats.joinedDate}
                  </span>

                  <span className="bg-purple-400/30 text-white px-4 py-1 rounded-full text-sm">
                    {mockUser.stats.streakDays} day streak 🔥
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}

          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Activity Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 transform transition-all hover:scale-105 duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-600 text-lg font-semibold">
                    Meditation Sessions
                  </span>

                  <span className="bg-blue-500 p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </div>

                <p className="text-4xl font-bold text-blue-600">
                  {mockUser.stats.meditationSessions}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 transform transition-all hover:scale-105 duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-green-600 text-lg font-semibold">
                    Completed Tasks
                  </span>

                  <span className="bg-green-500 p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                </div>

                <p className="text-4xl font-bold text-green-600">
                  {mockUser.stats.completedTasks}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 transform transition-all hover:scale-105 duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-purple-600 text-lg font-semibold">
                    Gratitude Entries
                  </span>

                  <span className="bg-purple-500 p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </span>
                </div>

                <p className="text-4xl font-bold text-purple-600">
                  {mockUser.stats.gratitudeEntries}
                </p>
              </div>
            </div>

            {/* Account Settings */}

            <div className="mt-12 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Account Settings
              </h2>

              <button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg  

hover:from-red-600 hover:to-red-700 transform transition-all duration-300  

hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 

shadow-lg hover:shadow-xl"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
