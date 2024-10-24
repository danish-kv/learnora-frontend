import React from "react";

const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg mb-4 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full mr-4 bg-gray-200 animate-pulse border-2 border-gray-100"></div>
          <div className="flex-1">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-3 text-sm mb-4 text-gray-600">
          <div className="flex items-center">
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="flex items-center">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="flex items-center">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="flex items-center">
            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="flex items-center">
            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-wrap justify-between gap-2">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
