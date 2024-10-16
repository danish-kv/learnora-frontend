import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";
import swal from "sweetalert";

const TutorEditQuestion = () => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([
    { option_text: "", is_correct: false },
  ]);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const res = await api.get(`question/${id}/`);
        setQuestionText(res.data.question_text);
        setOptions(res.data.options);
      } catch (error) {
        console.error("Error fetching question:", error);
        displayToastAlert(400, "Error fetching question");
      }
    };

    getQuestion();
  }, [id]);

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, { option_text: "", is_correct: false }]);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (questionText.trim() === "") {
      formErrors.questionText = "Question text is required";
    }
    if (!options.some((option) => option.is_correct)) {
      formErrors.correctOption =
        "At least one option must be marked as correct";
    }
    return formErrors;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    const payload = { question_text: questionText, options };

    try {
      const res = await api.patch(`question/${id}/`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        await swal(
          "Updated",
          "Contest Question Updated successfully",
          "success"
        );
        navigate("/tutor/contest/");
      }
    } catch (error) {
      console.error("Error updating question:", error);
      if (error.response && error.response.data) {
        Object.entries(error.response.data).forEach(([key, value]) => {
          displayToastAlert(400, `${key}: ${value}`);
        });
      } else {
        displayToastAlert(400, "Error updating question");
      }
    }
  };

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Edit Question</h1>
      <form
        onSubmit={handleOnSubmit}
        className="bg-white p-6 rounded-lg border space-y-6"
      >
        <div>
          <label
            htmlFor="question_text"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Question Text
          </label>
          <textarea
            id="question_text"
            name="question_text"
            rows="3"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your question here"
          />
          {errors.questionText && (
            <p className="mt-1 text-sm text-red-600">{errors.questionText}</p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Options</h2>
          <div className="space-y-3">
            {options.map((option, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-2"
              >
                <input
                  type="text"
                  value={option.option_text}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index].option_text = e.target.value;
                    setOptions(newOptions);
                  }}
                  className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={option.is_correct}
                    onChange={() => {
                      const newOptions = [...options];
                      newOptions[index].is_correct =
                        !newOptions[index].is_correct;
                      setOptions(newOptions);
                    }}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Correct</span>
                </label>
              </div>
            ))}
          </div>
          {errors.correctOption && (
            <p className="mt-1 text-sm text-red-600">{errors.correctOption}</p>
          )}
          {options.length < 4 && (
            <button
              type="button"
              onClick={handleAddOption}
              className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Option
            </button>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default TutorEditQuestion;
