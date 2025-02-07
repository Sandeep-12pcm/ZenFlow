import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import GratitudeJournal from "./pages/GratitudeJournal";
import PomodoroTimer from "./pages/PomodoroTimer";
import Reading from "./pages/Reading";
import Meditation from "./pages/Meditation";
import CommunityPage from "./pages/CommunityPage";
import Progress from "./components/Progress";
import Profile from "./pages/Profile";
import MeditationGuide from "./pages/MeditationGuide";
import TodoApp from "./components/TodoApp";
import HabitReplacer from "./components/HabitReplacer";
import Overview from "./pages/overview";
import Challenges from "./pages/Challenges";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gratitude-journal" element={<GratitudeJournal />} />
        <Route path="/pomodoro-timer" element={<PomodoroTimer />} />
        <Route path="/reading" element={<Reading />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/meditation-guide" element={<MeditationGuide />} />
        <Route path="/habit-replacer" element={<HabitReplacer />} /> 
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/challenges" element={<Challenges />} /> 
      </Routes>
    </Router>
  );
}

export default App;
