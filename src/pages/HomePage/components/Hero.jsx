import React from "react";
import { Link } from "react-router-dom";
import StatisticsSection from "./StatisticsSection";
import ImageCarousel from "./ImageCarousel";
import LandingImageSkeleton from "@/features/discussion/components/LandingImageSkeleton";

const Hero = ({ data, loading }) => {
  return (
    <div
      style={{
        background:
          "linear-gradient(144.88deg, rgba(255, 255, 255, 0.3) -3.98%, rgba(79, 70, 229, 0.2) 21.27%, rgba(79, 70, 229, 0.6) 71.28%)",
      }}
      className="min-h-screen flex flex-col"
    >
      <HeroContent />
      {loading ? (
        <LandingImageSkeleton />
      ) : (
        <ImageCarousel students={data?.students} />
      )}
      <StatisticsSection data={data} />
    </div>
  );
};

const HeroContent = () => (
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
        <Link to="/courses">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
            Explore Course
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default Hero;
