import React from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

const TutorCard = ({ tutor, onStatusChange, onBlockToggle, onClick }) => {
  const handleDownloadCv = (file, name) => {};

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer">
      <div className="p-6">
        <div className="flex items-center mb-4" onClick={onClick}>
          <img
            src={`${BASE_URL}${tutor.user.profile}`}
            alt={`${tutor.user.username}'s profile`}
            className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-blue-500"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {tutor.user.first_name.concat(tutor.user.last_name)}
            </h2>
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                tutor.status === "Verified"
                  ? "bg-green-100 text-green-800"
                  : tutor.status === "Rejected"
                  ? "bg-red-100 text-red-800"
                  : tutor.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {tutor.status}
            </span>
          </div>
        </div>
        <div className="space-y-2 text-sm mb-4 text-gray-600">
          <p>
            <span className="font-medium">Email:</span> {tutor.user.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {tutor.user.phone}
          </p>
          <p>
            <span className="font-medium">Courses:</span>{" "}
            {tutor.students ? tutor.students : "Nill"}
          </p>
          <p>
            <span className="font-medium">Students:</span>{" "}
            {tutor.students ? tutor.students : "Nill"}
          </p>
          <p>
            <span className="font-medium">Registered:</span>{" "}
            {new Date(tutor.user.date_joined).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Last Login:</span>{" "}
            {new Date(tutor.user.last_login).toLocaleDateString()}
          </p>
        </div>
        <div className="flex justify-between gap-2">
          <a
            href={`${BASE_URL}${tutor.cv}`}
            target="_blank"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition duration-300 ease-in-out"
          >
            View CV
          </a>

          { tutor.status === 'Requested' &&
            <>
            <button
              onClick={(e) => {
                onStatusChange(tutor.id, "Verified");
              }}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm transition duration-300 ease-in-out"
            >
              Accept
            </button>
          
            <button
              onClick={(e) => {
                onStatusChange(tutor.id, "Rejected");
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm transition duration-300 ease-in-out"
            >
              Reject
            </button>
            </>
}
         
          { tutor.status ==='Verified' &&
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBlockToggle(tutor.user.id, tutor.user.is_active);
            }}
            className={`${
              tutor.user.is_active
                ? "bg-yellow-500 hover:bg-yellow-700"
                : "bg-gray-500 hover:bg-gray-700"
            } text-white font-bold py-2 px-4 rounded text-sm transition duration-300 ease-in-out`}
          >
            {tutor.user.is_active ? "Block" : "Unblock"}
          </button>
          }
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
