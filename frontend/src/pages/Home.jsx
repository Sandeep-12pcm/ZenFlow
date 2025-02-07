import React from "react";
import { Link } from "react-router-dom";
import Overview from "./overview";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center bg-blue-500 text-white py-16">
        <h1 className="text-4xl font-bold">Welcome to ZenFlow</h1>
        <p className="text-lg mt-2">Enhance your productivity and well-being</p>
      </section>

      {/* Features Cards */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-6 p-10">
        <FeatureCard title="Gratitude Journal" link="/gratitude-journal" />
        <FeatureCard title="Pomodoro Timer" link="/pomodoro-timer" />
        <FeatureCard title="Reading" link="/reading" />
        <FeatureCard title="Meditation" link="/meditation" />
        <FeatureCard title="To-Do" link="/todo" />
        <FeatureCard title="Habit Replacer" link="/habit-replacer" />
      </section>

      <section>
        <Overview />
      </section>
    </div>
    


  );
};

const FeatureCard = ({ title, link }) => (
  <Link to={link} className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
    <h2 className="text-xl font-semibold text-center">{title}</h2>
  </Link>
);

export default Home;
