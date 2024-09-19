import { formatDate } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";

const TutorContestCard = ({ contest, onBlockToggle }) => {
  if (!contest) {
    return <h1>Contest is loading....</h1>;
  }

  const handleBlock = (id, current_status) => {
    onBlockToggle(id, current_status);
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{contest.name}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium absolute top-4 right-4 ${
            contest.status === "ongoing"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {contest.status}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{contest.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Total Questions</p>
          <p className="text-gray-800 font-medium">{contest.total_questions}</p>
          <p className="text-sm text-gray-500 mt-2">Max Points</p>
          <p className="text-gray-800 font-medium">{contest.max_points}</p>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Start Time</p>
              <p className="text-gray-800 font-medium">
                {contest.start_time
                  ? formatDate(new Date(contest.start_time), "dd, mmmm, yyyy")
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">End Time</p>
              <p className="text-gray-800 font-medium">
                {contest.end_time
                  ? formatDate(new Date(contest.end_time), "dd, mmmm, yyyy")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Link
          to={`/tutor/contest/${contest.id}`}
          className="bg-indigo-700 hover:bg-indigo-800 text-white p-3 py-2 rounded-md mr-2"
        >
          View
        </Link>
        <button
          onClick={() => handleBlock(contest.id, contest.is_active)}
          className={` ${
            contest.is_active
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          }   text-white px-4 py-2 rounded-md ml-2`}
        >
          {contest.is_active ? "Block" : 'Unblock' }
        </button>
      </div>
    </div>
  );
};

export default TutorContestCard;
