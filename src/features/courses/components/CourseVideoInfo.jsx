import React, { useState } from "react";
import { FaHeart, FaBook, FaRegHeart } from "react-icons/fa";
import { formatDuration } from "../../../utils/format";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

const CourseVideoInfo = ({ courseDetails, currentVideo, refetch }) => {

  if (!courseDetails || !currentVideo) {
    return null;
  }

  const total_duration = courseDetails?.modules.reduce((total, module) => {
    return total + module.duration;
  }, 0);

  const time = formatDuration(total_duration);
  const { id } = useParams();

  const handleModuleLike = async () => {
    const current_status = currentVideo.is_liked;
    console.log(current_status);

    try {
      const res = await api.patch(`modules/${id}/toggle-like/`)
      console.log(res.data);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-md shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{courseDetails.title}</h1>
        <div className="flex flex-col items-center">
          <button
            className={`text-red-500 hover:text-red-600`}
            onClick={handleModuleLike}
          >
            {currentVideo.is_liked ? (
              <FaHeart className="text-2xl" />
            ) : (
              <FaRegHeart className="text-2xl" />
            )}
          </button>
          <span className="text-sm text-gray-600">
            {currentVideo.likes_count} {currentVideo.likes_count === 1 ? "Like" : "Likes"}
          </span>
        </div>
      </div>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">
          {"★".repeat(Math.floor(courseDetails.average_rating || 0))}
          {"☆".repeat(5 - Math.floor(courseDetails.average_rating || 0))}
          {courseDetails.average_rating}
        </span>
        <span className="ml-2 text-sm text-gray-600">
          ({courseDetails.rating_count} ratings)
        </span>
        <span className="ml-4 text-sm text-gray-600">
          {courseDetails.total_enrollment} students enrolled
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <span>{time} total · </span>
        <span>
          Last updated {new Date(courseDetails.updated_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default CourseVideoInfo;
