import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchContestDetails from "../../hooks/useFetchContestDetails";
import {
  CheckCircleIcon,
  EditIcon,
  XCircleIcon,
  HomeIcon,
  ChevronRightIcon,
} from "lucide-react";
import { formatDate } from "@/utils/format";

const TutorContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contestDetails, error, loading } = useFetchContestDetails(id);

  const handleEditContest = () => {
    navigate(`/tutor/contest/${id}/edit`);
  };

  const handleEditQuestion = (questionId) => {
    navigate(`/tutor/contest/${id}/question/${questionId}/edit`);
  };

  if (loading)
    return <div className="text-center text-gray-500 my-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 my-8">{error}</div>;
  if (!contestDetails)
    return (
      <div className="text-center text-gray-500 my-8">
        No contest details found.
      </div>
    );

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
                to="/tutor/contest"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2"
              >
                Contests
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                {contestDetails.name}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Contest Overview */}
      <div className="bg-white border rounded-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h1 className="text-2xl font-bold mb-2 sm:mb-0">
            {contestDetails.name}
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              contestDetails.status === "ongoing"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {contestDetails?.status
              ? contestDetails.status.charAt(0).toUpperCase() +
                contestDetails.status.slice(1)
              : ""}
          </span>
        </div>
        <p className="text-gray-700">{contestDetails.description}</p>
      </div>

      {/* Contest Info */}
      <div className="bg-white border rounded-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-xl font-bold mb-2 sm:mb-0">Contest Details</h2>
          <button
            onClick={handleEditContest}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded transition duration-150 ease-in-out"
          >
            Edit Contest
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-500 text-sm uppercase mb-1">
              Total Questions
            </p>
            <p className="text-gray-800 font-medium">
              {contestDetails.total_questions}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm uppercase mb-1">Max Points</p>
            <p className="text-gray-800 font-medium">
              {contestDetails.max_points}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm uppercase mb-1">Category</p>
            <p className="text-gray-800 font-medium">
              {contestDetails.category?.name || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm uppercase mb-1">Time Limit</p>
            <p className="text-gray-800 font-medium">
              {contestDetails.time_limit
                ? `${contestDetails.time_limit} minutes`
                : "No limit"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm uppercase mb-1">Start Time</p>
            <p className="text-gray-800 font-medium">
              {contestDetails.start_time
                ? formatDate(
                    new Date(contestDetails.start_time),
                    "dd, mmmm, yyyy"
                  )
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm uppercase mb-1">End Time</p>
            <p className="text-gray-800 font-medium">
              {contestDetails?.end_time
                ? formatDate(
                    new Date(contestDetails?.end_time),
                    "dd, mmmm, yyyy"
                  )
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Questions</h2>
        {contestDetails.questions?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {contestDetails.questions.map((question, index) => (
              <div
                key={question.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">{`Q${index + 1}: ${
                    question.question_text
                  }`}</h3>
                  <button
                    onClick={() => handleEditQuestion(question.id)}
                    className="text-indigo-600 hover:text-indigo-700 transition duration-150 ease-in-out"
                  >
                    <EditIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="ml-4">
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center mb-2">
                      {option.is_correct ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span
                        className={`text-gray-700 ${
                          option.is_correct ? "font-medium" : ""
                        }`}
                      >
                        {option.option_text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No questions available for this contest.
          </p>
        )}
      </div>
    </div>
  );
};

export default TutorContestDetails;
