import React from "react"; 

const features = [ 
  { 
    title: "Gratitude Journal", 
    description: 
      "Cultivate a positive mindset by recording daily moments of gratitude. Reflect on what made your day special and develop a habit of appreciation.", 
    image: "./images/Gratitude.jpg", 
  }, 
  { 
    title: "Pomodoro Timer", 
    description: 
      "Boost your productivity with the Pomodoro technique. Work in focused intervals followed by short breaks to stay efficient and avoid burnout.", 
    image: "http://artia.com/wp-content/uploads/2013/04/Pomodoro-Technique-Timer.jpg", 
  }, 
  { 
    title: "Reading", 
    description: 
      "Track and organize your reading habits. Set goals, bookmark your favorite books, and dive into a world of knowledge and imagination.", 
    image: "https://static01.nyt.com/images/2017/07/18/well/mfrl_books/mfrl_books-superJumbo.gif", 
  }, 
  { 
    title: "Meditation", 
    description: 
      "Achieve mindfulness through guided meditation. Reduce stress, improve focus, and enhance your overall well-being with peaceful sessions.", 
    image: "https://img.mensxp.com/media/content/2022/Oct/yoga-lotus-pose-meditation_635b7b1822f7c.jpeg", 
  }, 
  { 
    title: "To-Do List", 
    description: 
      "Manage your tasks efficiently with a simple yet powerful to-do list. Prioritize, track progress, and stay on top of your daily activities.", 
    image: "https://tse2.mm.bing.net/th?id=OIP.qMkJK2AxyqFrakrHa9Z_iAHaFj&pid=Api&P=0&h=180", 
  }, 
  { 
    title: "Habit Replacer", 
    description: 
      "Transform bad habits into productive ones. Identify triggers, set goals, and build a sustainable routine to improve your lifestyle.", 
    image: "https://bmlwealth.net/wp-content/uploads/2021/11/How-to-Change-Your-Habits.jpeg",
  }, 
]; 

const Overview = () => { 
  return ( 
    <section className="bg-gray-100 py-16"> 
      <div className="container mx-auto px-6"> 
        <h2 className="text-4xl font-bold text-center text-[#2563eb] mb-12"> 
          Website Features 
        </h2> 
        <div className="space-y-16"> 
          {features.map((feature, index) => ( 
            <div 
              key={index} 
              className={`flex flex-col md:flex-row items-center ${ 
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse" 
              }`} 
            > 
              {/* Image Section */} 
              <div className="md:w-1/2"> 
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-64 h-64 object-cover rounded-xl shadow-lg" // Set fixed width and height
                /> 
              </div> 
              {/* Description Section */} 
              <div className="md:w-1/2 p-6"> 
                <h3 className="text-2xl font-semibold text-[#2563eb]"> 
                  {feature.title} 
                </h3> 
                <p className="text-gray-700 mt-4">{feature.description}</p> 
              </div> 
            </div> 
          ))} 
        </div> 
      </div> 
    </section> 
  ); 
};

export default Overview;
