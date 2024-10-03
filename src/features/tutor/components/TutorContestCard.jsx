import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/format";

const TutorContestCard = ({ contest }) => {
  if (!contest) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 sm:p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
          {contest.name}
        </h3>
        <span
          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
            contest.status === "ongoing"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {contest.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-4 flex-grow overflow-hidden line-clamp-2 text-ellipsis">
        {contest.description}
      </p>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Total Questions</p>
          <p className="font-medium">{contest.total_questions}</p>
        </div>
        <div>
          <p className="text-gray-500">Start Time</p>
          <p className="font-medium">
            {contest.start_time
              ? formatDate(new Date(contest.start_time), "dd MMM yyyy")
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Max Points</p>
          <p className="font-medium">{contest.max_points}</p>
        </div>
        <div>
          <p className="text-gray-500">End Time</p>
          <p className="font-medium">
            {contest.end_time
              ? formatDate(new Date(contest.end_time), "dd MMM yyyy")
              : "N/A"}
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Link
          to={`/tutor/contest/${contest.id}`}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default TutorContestCard;
