import React from "react";
import { Link } from "react-router-dom";

const JoinUsBanner = () => {
  return (
    <div className="bg-indigo-600 rounded-lg overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="text-white md:w-3/5 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold mb-4">
            Join us today to embark on your journey to success!
          </h2>
          <p className="text-lg mb-6">
            Take advantage of our comprehensive resources, expert guidance, and
            supportive community to achieve your educational and professional
            goals.
          </p>
          <Link to="/courses">
            <button className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-full hover:bg-indigo-50 transition duration-300">
              Join Course
            </button>
          </Link>
        </div>
        <div className="md:w-2/5 flex justify-end">
          <img
            src="tutor-image.png"
            alt="Professional tutor"
            className="w-auto h-80 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default JoinUsBanner;