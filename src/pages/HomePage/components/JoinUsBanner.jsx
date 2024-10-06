import React from 'react';

const JoinUsBanner = () => {
  return (
    <div className="max-w-7xl m-auto bg-indigo-600 rounded-2xl overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between">
        <div className="text-white md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Join us today to embark on your journey to success!
          </h2>
          <p className="text-lg mb-6">
            Take advantage of our comprehensive resources, expert guidance, 
            and supportive community to achieve your educational and 
            professional goals.
          </p>
          <button className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-full hover:bg-indigo-50 transition duration-300">
            Join Course
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img 
            src="/api/placeholder/400/500" 
            alt="Professional" 
            className="w-64 h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default JoinUsBanner;