import React from "react";

const Banner = ({ title, description, buttonText, icon, gradient, onClick }) => {
  const Icon = icon;
  return (
    <div className={`text-white py-12 px-4 sm:px-6 lg:px-8 ${gradient}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:mr-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg sm:text-xl mb-6">{description}</p>
            <button
              onClick={onClick}
              className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-full hover:bg-indigo-100 transition duration-300"
              style={{ color: gradient.split(' ')[2] }} // Text color matches the gradient
            >
              {buttonText}
            </button>
          </div>
          <div className="flex-shrink-0">
            <Icon size={100} className="text-white opacity-75" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;