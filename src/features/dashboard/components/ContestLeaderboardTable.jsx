import React from "react";
import TableWrapper from "./TableWrapper";
import { Award, User, Trophy, Calendar, Clock } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { formatDate } from "@/utils/format";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const ContestLeaderboardTable = ({ contestData }) => {
  if (!contestData || contestData.length === 0) return null;

  const getOrdinalSuffix = (i) => {
    const j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  };

  const getMedalColor = (rank) => {
    switch (rank) {
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-orange-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <TableWrapper title="Contest Leaderboard">
      <ul className="divide-y divide-gray-200">
        {contestData.map((entry, index) => (
          <li key={index} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Trophy
                  className={`h-6 w-6 ${getMedalColor(entry.rank)} mr-2`}
                />
                <p className="text-lg font-medium text-gray-900">
                  {getOrdinalSuffix(entry.rank)} Place
                </p>
              </div>
              <div className="ml-2 flex-shrink-0 flex">
                <p className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                  Score: {entry.score}
                </p>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div className="flex items-center text-sm text-gray-500">
                <User className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <span className="font-semibold mr-1">User:</span>
                {entry.user.username}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Award className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <span className="font-semibold mr-1">Contest:</span>
                {entry.contest.name}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <span className="font-semibold mr-1">Date:</span>
                {entry.created_at
                  ? formatDate(new Date(entry.created_at), "dd mmmm yyyy")
                  : "N/A"}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </TableWrapper>
  );
};

export default ContestLeaderboardTable;
