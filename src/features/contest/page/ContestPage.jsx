import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Clock } from 'lucide-react';

const ContestPage = () => {
  const [timeRemaining, setTimeRemaining] = useState(5340); // 1 hour, 29 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(9);
  const totalQuestions = 10;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock size={20} />
            <span className="text-lg">{formatTime(timeRemaining)}</span>
          </div>
          <button className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors text-sm">
            Submit
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-sm text-gray-500 mb-2">Question {currentQuestion} of {totalQuestions}</h2>
          <p className="text-lg font-medium">Which of the following is a popular programming language for developing multimedia webpages?</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {['COBOL', 'COBOL', 'COBOL', 'COBOL'].map((option, index) => (
            <button key={index} className="bg-gray-100 hover:bg-gray-200 text-left px-4 py-3 rounded-md transition-colors">
              <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm">
              Prev
            </button>
            {[...Array(totalQuestions)].map((_, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-md text-sm ${
                  currentQuestion === index + 1 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors`}
              >
                {index + 1}
              </button>
            ))}
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm">
              Next
            </button>
          </div>
          <div className="w-16 h-16">
            <CircularProgressbar
              value={(score / totalQuestions) * 100}
              text={`${score}/${totalQuestions}`}
              styles={buildStyles({
                textSize: '28px',
                pathColor: '#15803d',
                textColor: '#15803d',
                trailColor: '#e5e7eb',
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestPage;