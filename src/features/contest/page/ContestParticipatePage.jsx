import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import useFetchContestDetails from "@/features/tutor/hooks/useFetchContestDetails";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/services/api";
import Swal from "sweetalert2";
import CountdownTimer from "../components/CountDownTimer";

const ContestParticipatePage = () => {
  const [timeRemaining, setTimeRemaining] = useState(5340); // 1 hour, 29 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0); // Start with the first question (index 0)
  const [selectedOption, setSelectedOption] = useState(null);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const { contestDetails, error, loading } = useFetchContestDetails(id);

  if (
    !contestDetails ||
    !contestDetails.questions ||
    contestDetails.questions.length === 0
  ) {
    return <p>No questions available for this contest.</p>;
  }

  const totalQuestions = contestDetails.questions.length;
  const currentQuestionData = contestDetails.questions[currentQuestion];

  
  const handleOptionSelect = (optionID) => {
    console.log("selected option ==", optionID);

    setSelectedOption(optionID);
    console.log(selectedOption);
  };

  const submitAnswer = async (questionID, optionID) => {
    try {
      const res = await api.post("answer-submission/", {
        question_id: questionID,
        selected_option_id: optionID,
        participant_id: contestDetails.participant_id,
      });
      console.log(res);
      setSubmittedQuestions((prev) => [...prev, questionID]);
    } catch (error) {
      console.log(error.response.data);
      const info = error.response.data.info;
      await swal("Oops", `${info ? info : "Failed to Submit"}`, "warning");
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNextQuestion = async () => {
    if (selectedOption === null) {
      console.log("nothing seleceted ");
      return swal(
        "Option not selected",
        "Please select an option before moving to the next question.",
        "warning"
      );
    } else {
      submitAnswer(currentQuestionData.id, selectedOption);
      if (currentQuestion === totalQuestions - 1) {
        try {
          const res = await api.post("answer-submission/stop_or_complete/", {
            participant_id: contestDetails.participant_id,
          });
          Swal.fire("Finished!", "Your contest has been submitted.", "success");
          navigate(`/contest/${id}`);
          console.log(res);
        } catch (error) {
          Swal.fire(
            "Oops!",
            "Something went wrong while submitting the contest.",
            "error"
          );
          console.log(error);
        }
      }
      setSelectedOption(null);
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion((prev) => prev + 1);
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleFinish = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You haven't completed all the questions. Do you really want to finish the contest?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, finish it!",
      cancelButtonText: "No, continue",
    });

    if (result.isConfirmed) {
      try {
        const res = await api.post("answer-submission/stop_or_complete/", {
          participant_id: contestDetails.participant_id,
        });
        await Swal.fire(
          "Finished!",
          "Your contest has been submitted.",
          "success"
        );
        navigate(`/contest/${id}`);
        console.log(res);
      } catch (error) {
        await Swal.fire(
          "Oops!",
          "Something went wrong while finishing the contest.",
          "error"
        );
        console.log(error);
      }
    }
  };

  console.log("current :", currentQuestion, "toal qeustion :", totalQuestions);
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-5xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock size={20} />
              <CountdownTimer timeLimit={contestDetails.time_limit} />

              {/* <span className="text-lg">{formatTime(timeRemaining)}</span> */}
            </div>
            <button
              onClick={handleFinish}
              className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-800 transition-colors text-sm"
            >
              Finish
            </button>
          </div>

          {/* Question Display */}
          <div className="mb-6">
            <h2 className="text-sm text-gray-500 mb-2">
              Question {currentQuestion + 1} of {totalQuestions}
            </h2>
            <p className="text-lg font-medium">
              {currentQuestionData.question_text}
            </p>
          </div>

          {/* Options Display */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`${
                  selectedOption === option.id
                    ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                    : "bg-gray-100  hover:bg-indigo-200"
                }  text-left px-4 py-3 rounded-md transition-colors`}
              >
                <span className="font-medium mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>{" "}
                {option.option_text}
              </button>
            ))}
          </div>

          {/* Navigation and Progress */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={handlePrevQuestion}
                className={`bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm  opacity-50`}
                disabled={true}
              >
                Prev
              </button>

              {[...Array(totalQuestions)].map((_, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-md text-sm ${
                    currentQuestion === index
                      ? "bg-indigo-700 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition-colors`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={handleNextQuestion}
                className={`bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm ${
                  currentQuestion === totalQuestions - 1 &&
                  "bg-indigo-300 text-stone-50"
                }`}
                disabled={currentQuestion === totalQuestions}
              >
                {currentQuestion === totalQuestions - 1 ? "Done" : "Next"}
              </button>
            </div>

            {/* Score Display */}
            <div className="max-w-24 h-24">
              <CircularProgressbar
                value={(currentQuestion / totalQuestions) * 100}
                text={`${currentQuestion}/${totalQuestions}`}
                styles={buildStyles({
                  textSize: "28px",
                  pathColor: "#4338CA",
                  textColor: "#4338CA",
                  trailColor: "#e5e7eb",
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContestParticipatePage;
