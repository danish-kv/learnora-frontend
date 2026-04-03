import React from "react";
import { formatDate } from "@/utils/format";
import { Mail, Phone, BookOpen, Calendar, Clock } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL;

const TutorCard = ({ tutor, onStatusChange, onBlockToggle, onClick }) => {
  const statusColors = {
    Verified: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Requested: "bg-blue-100 text-blue-800",
    default: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="p-6">
        <div
          className="flex items-center mb-4 cursor-pointer"
          onClick={onClick}
        >
          <img
            src={`${tutor.user?.profile}`}
            alt={`${tutor.user?.username}'s profile`}
            className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-blue-500"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {`${tutor.user?.first_name} ${tutor.user?.last_name}`.trim()}
            </h2>
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                statusColors[tutor.status] || statusColors.default
              }`}
            >
              {tutor?.status}
            </span>
          </div>
        </div>
        <div className="space-y-2 text-sm mb-4 text-gray-600">
          <p className="flex items-center">
            <Mail className="mr-2" size={16} /> {tutor.user?.email}
          </p>
          <p className="flex items-center">
            <Phone className="mr-2" size={16} /> {tutor.user?.phone || "N/A"}
          </p>
          <p className="flex items-center">
            <BookOpen className="mr-2" size={16} /> Courses:{" "}
            {tutor.total_courses || "Nil"}
          </p>
          <p className="flex items-center">
            <Calendar className="mr-2" size={16} /> Registered:{" "}
            {formatDate(new Date(tutor.user?.date_joined), "dd MMM yyyy") ||
              "N/A"}
          </p>
          <p className="flex items-center">
            <Clock className="mr-2" size={16} /> Last Login:{" "}
            {formatDate(new Date(tutor.user?.last_login), "dd MMM yyyy") ||
              "N/A"}
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-2">
          <a
            href={`${BASE_URL}${tutor.cv}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition duration-300 ease-in-out flex-grow md:flex-grow-0"
          >
            View CV
          </a>

          {tutor.status === "Requested" && (
            <>
              <button
                onClick={() => onStatusChange(tutor.id, "Verified")}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm transition duration-300 ease-in-out flex-grow md:flex-grow-0"
              >
                Accept
              </button>
              <button
                onClick={() => onStatusChange(tutor.id, "Rejected")}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm transition duration-300 ease-in-out flex-grow md:flex-grow-0"
              >
                Reject
              </button>
            </>
          )}

          {tutor.status === "Verified" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBlockToggle(tutor.user.id, tutor.user.is_active);
              }}
              className={`${
                tutor.user?.is_active
                  ? "bg-yellow-500 hover:bg-yellow-700"
                  : "bg-gray-500 hover:bg-gray-700"
              } text-white font-bold py-2 px-4 rounded text-sm transition duration-300 ease-in-out flex-grow md:flex-grow-0`}
            >
              {tutor.user?.is_active ? "Block" : "Unblock"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
