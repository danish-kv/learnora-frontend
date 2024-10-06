import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const StatItem = ({ number, text }) => (
    <div className="text-center">
      <div className="text-4xl font-bold text-white mb-2">{number}</div>
      <div className="text-sm text-indigo-100">{text}</div>
    </div>
  );

  const Statistics = () => (
    <div className="bg-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem number="700+" text="Success Stories" />
          <StatItem number="200+" text="Expert Instructor" />
          <StatItem number="80k+" text="Worldwide Students" />
          <StatItem number="500+" text="Trendy Subjects" />
        </div>
      </div>
    </div>
  );

  const ImageDisplay = () => {
    const images = [
      "https://picsum.photos/seed/picsum/300/400",
      "https://picsum.photos/seed/picsum/200/300",
      "https://picsum.photos/seed/picsum/200/300",
      "https://picsum.photos/seed/picsum/200/300",
      "https://picsum.photos/seed/picsum/200/300",
    ];

    return (
      <div className="w-full overflow-hidden bg-gray-100 py-8">
        <div className="flex space-x-4 animate-scroll">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Professional ${index + 1}`}
              className="w-48 h-64 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(144.88deg, rgba(255, 255, 255, 0.3) -3.98%, rgba(79, 70, 229, 0.2) 21.27%, rgba(79, 70, 229, 0.6) 71.28%)",
      }}
      className="min-h-screen flex flex-col"
    >
      <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl w-full space-y-8 text-center">
          <div className="bg-indigo-100 text-indigo-600 py-2 px-4 rounded-full inline-block mb-8">
            Over 3 million ready-to-work creatives!
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Start Your Journey Toward Academic Excellence
          </h1>

          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            We have simplified the learning process to suit your needs, offering
            user-friendly courses designed for easy comprehension and practical
            application.
          </p>

          <div className="mt-8">
            <Link to={"/courses"}>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                Explore Course
              </button>
            </Link>
          </div>
        </div>
      </div>
      <ImageDisplay />
      <Statistics />
    </div>
  );
};

export default Hero;
