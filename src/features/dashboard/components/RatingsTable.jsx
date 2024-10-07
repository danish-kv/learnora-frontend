import React from "react";
import TableWrapper from "./TableWrapper";
import { Star, User, BookOpen, MessageSquare } from "lucide-react";

export const RatingsTable = ({ ratingsData }) => {
  if (!ratingsData || ratingsData.length === 0) return null;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} fill={i < rating ? "currentColor" : "none"} className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  return (
    <TableWrapper title="Recent Ratings">
      <ul className="divide-y divide-gray-200">
        {ratingsData.map((rating, index) => (
          <li key={index} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-indigo-600 mr-2" />
                <p className="text-sm font-medium text-indigo-600 truncate">{rating?.course_data?.title}</p>
              </div>
              <div className="flex items-center">
                {renderStars(rating?.rating)}
                <span className="ml-2 text-sm text-gray-600">{rating?.rating}/5</span>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <User className="h-4 w-4 text-gray-400 mr-1" />
              <span className="font-medium mr-2">User:</span>
              {rating?.user?.username}
            </div>
            <div className="mt-2 flex items-start text-sm text-gray-500">
              <MessageSquare className="h-4 w-4 text-gray-400 mr-1 mt-1" />
              <div>
                <span className="font-medium mr-2">Feedback:</span>
                <p className="inline-block">{rating?.feedback || 'No feedback provided.'}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </TableWrapper>
  );
};

export default RatingsTable;