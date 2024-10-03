import React from "react";

const Leaderboard = ({ participants }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Leaderboard</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {participants && participants.length > 0 ? (
          participants.map((participant, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-500 w-6 text-center">
                  #{index + 1}
                </span>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {participant.user__username.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 truncate max-w-[100px]">
                  {participant.user__username}
                </span>
              </div>
              <span className="text-sm font-semibold text-blue-600">
                {participant.total_score} pts
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No participants available yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
