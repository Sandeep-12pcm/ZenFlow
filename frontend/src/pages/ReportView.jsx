import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReportView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const progressData = location.state ? location.state.progressData : [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Progress Report</h1>
      <div className="p-6 bg-white shadow-md rounded-lg w-3/4">
        <h2 className="text-xl font-semibold mb-4">Your Sessions</h2>
        {progressData && (
          <div className="border border-gray-300 p-4 rounded">
            <p><strong>Task:</strong> {progressData.description}</p>
            <p><strong>Date:</strong> {progressData.date}</p>
            <p><strong>Time:</strong> {progressData.time}</p>
            <p><strong>Coins Earned:</strong> {progressData.coins}</p>
          </div>
        )}
      </div>

      <button onClick={() => navigate("/")} className="mt-6 bg-blue-500 text-white px-6 py-2 rounded">
        Back to Timer
      </button>
    </div>
  );
};

export default ReportView;
