import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchContestDetails from "../../hooks/useFetchContestDetails";
import { CheckCircleIcon, EditIcon, XCircleIcon } from "lucide-react";
import { formatDate } from "@/utils/format";

const TutorContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { contestDetails, error, loading } = useFetchContestDetails(id);

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


    const handleEditContest = () => {
      navigate(`/tutor/contest/${id}/edit`); 
    };
  
    const handleEditQuestion = (questionId) => {
      navigate(`/tutor/contest/${id}/question/${questionId}/edit`); 
    };

    
  return (
    <div className="p-8 bg-gray-100">
      {/* Contest Overview */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{contestDetails.name}</h1>
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
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Contest Details</h2>
          <button
            onClick={handleEditContest}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded"
          >
            Edit Contest
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
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
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Questions</h2>
        {contestDetails.questions?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contestDetails.questions.map((question, index) => (
              <div
                key={question.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">
                    {`Q${index + 1}: ${question.question_text}`}
                  </h3>
                  <button
                    onClick={() => handleEditQuestion(question.id)}
                    className="text-blue-500 hover:text-blue-600"
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
