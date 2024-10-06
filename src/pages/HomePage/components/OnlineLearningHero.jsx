import React from 'react';

const OnlineLearningHero = () => {
  const FeatureCard = ({ title, description }) => (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-2">
        <svg className="w-6 h-6 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h1 className="text-5xl font-bold mb-4">
              Online Learning
              <span className="block "><span className='text-indigo-500'>Designed</span> For Real Life</span>
            </h1>
            <p className="text-gray-600 mb-8">
              From foundational courses that lay the groundwork for your educational
              journey to advanced specializations. From foundational courses that lay
              the groundwork for your educational journey to advanced specializations.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <FeatureCard
                title="User-friendly platform to learn more"
                description="Packed with modern tech, classroom learning which used to be done conventionally."
              />
              <FeatureCard
                title="User-friendly platform to learn more"
                description="Packed with modern tech, classroom learning which used to be done conventionally."
              />
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 relative">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
              <div className="flex items-center mb-2">
                <svg className="w-6 h-6 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <h3 className="text-lg font-semibold">User-friendly platform to learn</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Packed with modern tech, classroom learning which used to be done conventionally.
              </p>
            </div>
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="Educational materials"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineLearningHero;