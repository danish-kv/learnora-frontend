import React, { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import useFetchCourseDetails from "../hooks/useFetchCourseDetails";
import api from "../../../services/api";
const TutorCourseDetails = () => {
  const [expandedModule, setExpandedModule] = useState(null);
  const { slug } = useParams();
  console.log("slug === ", slug);

  const { courseDetails, error, refetch } = useFetchCourseDetails(slug);
  console.log(`course details of ${slug}`, courseDetails);

  const handleDeleteModule = async(id) => {
    console.log(id);
    try {

      const res = await api.delete(`modules/${id}/`)
      console.log(res);
      if(res.status === 204){
        swal({
          title: "Deleted!",
          text: "Modules have been deleted successfully.",
          icon: "success",
          button: "Okay",
        });
      }
      refetch()
      
    } catch (error) {
      
      console.log(error);
      
    }
    
  }

  return (
    <div className="container mx-auto px-5 py-8">
      <div className="mb-6">
        <img
          src={courseDetails?.thumbnail}
          alt="Course Thumbnail"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{courseDetails?.title}</h1>
          <Link to={`/tutor/course/edit/${slug}`}>
            <button className="text-blue-600 hover:text-blue-800">Edit</button>
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
            <p>{courseDetails?.rental_duration}days</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Category</h3>
            <p>Web Development</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-600 mb-1">Status</h3>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {courseDetails?.status}
          </span>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Modules</h2>
          <Link to={`/tutor/new-module/${courseDetails?.id}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
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
                <span className="font-medium text-blue-600">
                  {module.title}
                </span>
              </div>
              <div className="flex items-center">
                  <Link to={`/tutor/module/edit/${module.id}`}>
                    <button className="text-gray-600 hover:text-gray-800 mr-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                </Link>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteModule(module.id);
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <button
                  className={`text-gray-600 hover:text-gray-800 ml-2 ${
                    index === expandedModule ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
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
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      Notes
                    </a>
                    <a
                      href={module.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
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
                    <span>10 min</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600 mr-2">
                      Views:
                    </span>
                    <span>100</span>
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
