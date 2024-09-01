import React, { useState } from 'react';

const SeeMoreReviewModal = ({ isOpen, onClose, reviews, averageRating }) => {

  console.log('sfdsff');
  

  if (!isOpen) return null;


  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  const getRatingPercentage = (rating) => {
    return ((ratingCounts[rating] || 0) / reviews.length * 100).toFixed(0) + '%';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              ★ {averageRating.toFixed(1)} course rating • {reviews.length} ratings
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center mb-2">
              <div className="w-24 text-sm text-gray-600">
                {'★'.repeat(rating)}{'☆'.repeat(5-rating)}
              </div>
              <div className="flex-grow bg-gray-200 rounded-full h-2 ml-4">
                <div 
                  className="bg-yellow-400 h-2 rounded-full" 
                  style={{width: getRatingPercentage(rating)}}
                ></div>
              </div>
              <div className="w-12 text-right text-sm text-gray-600 ml-4">
                {getRatingPercentage(rating)}
              </div>
            </div>
          ))}
          
        </div>

        <div className="p-6">
          {reviews.map((review, index) => (
            <div key={index} className="mb-6 pb-6 border-b last:border-b-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                    {review.user.username[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold">{review.user.username}</div>
                    <div className="text-yellow-400">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                      <span className="text-gray-500 ml-2 text-sm">{review.date}</span>
                    </div>
                  </div>
                </div>
                
              </div>
              <p className="mt-3 text-gray-700">{review.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeMoreReviewModal;