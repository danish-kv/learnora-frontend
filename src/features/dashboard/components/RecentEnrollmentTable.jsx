import React from "react";
import TableWrapper from "./TableWrapper";
import { Calendar, User, BookOpen, Clock } from "lucide-react";
import { formatDate } from "@/utils/format";

export const RecentEnrollmentTable = ({ enrollmentsData }) => {
  if (!enrollmentsData || enrollmentsData.length === 0) return null;

  return (
    <TableWrapper title="Recent Enrollments">
      <ul className="divide-y divide-gray-200">
        {enrollmentsData.map((enrollment, index) => (
          <li key={index} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-indigo-600 mr-2" />
                <p className="text-sm font-medium text-indigo-600 truncate">{enrollment?.course?.title}</p>
              </div>
              <div className="ml-2 flex-shrink-0">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {enrollment?.status || 'Enrolled'}
                </span>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <User className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <span className="font-medium mr-2">Student:</span>
                {enrollment?.student?.username}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <span className="font-medium mr-2">Enrolled on:</span>
                {enrollment?.created_at
                  ? formatDate(new Date(enrollment?.created_at), "dd mmmm yyyy")
                  : "N/A"}
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              <span className="font-medium mr-2">Progress:</span>
              {enrollment?.progress || '0%'}
            </div>
          </li>
        ))}
      </ul>
    </TableWrapper>
  );
};

export default RecentEnrollmentTable;