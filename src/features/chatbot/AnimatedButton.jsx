import React from 'react';
import { MessageCircle } from 'lucide-react';

const AnimatedChatButton = ({ onClick }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-rotate"></div>
      <button
        onClick={onClick}
        className="relative bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-lg transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
      >
        <MessageCircle size={24} />
      </button>
      <style jsx>{`
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-rotate {
          animation: rotate 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedChatButton;