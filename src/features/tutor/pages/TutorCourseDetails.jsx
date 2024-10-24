import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchCourseDetails from "../hooks/useFetchCourseDetails";
import api from "../../../services/api";
import { formatDuration } from "../../../utils/format";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { displayToastAlert } from "@/utils/displayToastAlert";
const TutorCourseDetails = () => {
  const [expandedModule, setExpandedModule] = useState(null);
  const { slug } = useParams();
  console.log("slug === ", slug);

  const { courseDetails, error, refetch } = useFetchCourseDetails(slug);
  console.log(`course details of ${slug}`, courseDetails);

  const handleDeleteModule = async (id) => {
    console.log(id);
    try {
      const res = await api.delete(`modules/${id}/`);
      console.log(res);
      if (res.status === 204) {
        displayToastAlert(200, "Modules have been deleted successfully")
      }
      refetch();
    } catch (error) {
      console.log(error);
      displayToastAlert(400, "Facing some issue, please try again later...")
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              to="/tutor"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              <Link
                to="/tutor/course"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2"
              >
                Courses
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                {courseDetails?.title}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="mb-6 border rounded-lg">
        <img
          src={courseDetails?.thumbnail}
          alt="Course Thumbnail"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold">{courseDetails?.title}</h1>
          <Link to={`/tutor/course/edit/${slug}`}>
            <button className="text-indigo-700 hover:text-indigo-800">
              Edit
            </button>
          </Link>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{courseDetails?.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-gray-600">Price</h3>
            <p>${courseDetails?.price}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Rental Price</h3>
            <p>${courseDetails?.rental_price}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Rental Duration</h3>
            <p>{courseDetails?.rental_duration} days</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Category</h3>
            <p>{courseDetails?.category_data?.name}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-600 mb-1">Status</h3>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              courseDetails?.status === "Published"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {courseDetails?.status}
          </span>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Modules</h2>
          <Link to={`/tutor/new-module/${courseDetails?.id}`}>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Add Module
            </button>
          </Link>
        </div>

        {courseDetails?.modules?.map((module, index) => (
          <div key={index} className="mb-4">
            <div
              className="flex justify-between items-center border border-gray-200 rounded-lg p-4 cursor-pointer"
              onClick={() =>
                setExpandedModule(index === expandedModule ? null : index)
              }
            >
              <div className="flex items-center">
                <span className="font-medium text-indigo-600">
                  {module.title}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Link to={`/tutor/module/edit/${module.id}`}>
                  <button className="text-gray-600 hover:text-gray-800">
                    Edit
                  </button>
                </Link>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteModule(module.id);
                  }}
                >
                  Delete
                </button>
                <button
                  className={`text-gray-600 hover:text-gray-800 ${
                    index === expandedModule ? "rotate-180" : ""
                  }`}
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {index === expandedModule && (
              <div className="p-4 border border-t-0 rounded-lg rounded-t-none">
                <p className="mb-2">{module.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-semibold text-gray-600 mr-2">
                      Likes:
                    </span>
                    <span>{module.likes_count}</span>
                  </div>
                  <div>
                    <a
                      href={module.notes}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 mr-2"
                    >
                      Notes
                    </a>
                    <a
                      href={module.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Video
                    </a>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-gray-600 mr-2">
                      Duration:
                    </span>
                    <span>{formatDuration(module.duration)}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600 mr-2">
                      Views:
                    </span>
                    <span>{module.views_count}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorCourseDetails;
