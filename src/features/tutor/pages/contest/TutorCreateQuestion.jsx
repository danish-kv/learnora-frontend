import React, { useState } from "react";
import TutorSidebar from "../../components/TutorSidebar";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";
import { useNavigate, useParams } from "react-router-dom";

const TutorCreateQuestion = () => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([
    { option_text: "", is_correct: false },
  ]);
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate()


  const handleAddOption = () => {
    setOptions([...options, { option_text: "", is_correct: false }]);
  };

//   const validateForm = () => {
//     let formErrors = {};

//     // Check if question text is empty
//     if (questionText.trim() === "") {
//       formErrors.questionText = "Question text is required";
//     }

//     // Validate options
//     const optionErrors = options.map((option, index) => {
//       if (option.option_text.trim() === "") {
//         return `Option ${String.fromCharCode(65 + index)} is required`;
//       }
//       return null;
//     });

//     // If no options provided, add error
//     if (options.length === 0) {
//       formErrors.options = ["At least one option must be provided"];
//     } else {
//       formErrors.options = optionErrors.filter((err) => err !== null);
//     }

//     // Ensure at least one option is marked as correct
//     if (!options.some((option) => option.is_correct)) {
//       formErrors.correctOption =
//         "At least one option must be marked as correct";
//     }

//     return formErrors;
//   };

  const handleOnSubmit = async (e, actionType) => {
    e.preventDefault();
    console.log("buttoons clicked");
    console.log(questionText);
    console.log(options);
    

    // const formErrors = validateForm();
    // setErrors(formErrors);
    // console.log("validation completed");
    // console.log(Object.keys(formErrors).length);
    // console.log(formErrors);
    // console.log(Object.keys(formErrors).length);

    // if (Object.keys(formErrors).length > 0) {
    //   console.log("problems in if conditions");
    //   return;
    // }

    // options.forEach((option, index) => {
    //   formData.append(`options[${index}].option_text`, option.option_text);
    //   formData.append(`options[${index}].is_correct`, option.is_correct);
    // });

    const payLoad = {
        question_text : questionText,
        contest : id,
        options : options
    }


    console.log("final thired");
    try {
      const res = await api.post("question/", payLoad,{
        headers :{
            "Content-Type" : 'application/json'
        }
      });
      if (res.status === 201) {
        displayToastAlert(200, "Question created successfully!");
        if (actionType === "addAnother") {
          setQuestionText("");
          setOptions([{ option_text: "", is_correct: false }]);
        } else if (actionType === "finish") {
          await swal("success", "Contest Question creation completed", "success");
          navigate('/tutor/contest/')
        }
      }
    } catch (error) {
      console.error(error);
      displayToastAlert(400, "Error creating question");
    }
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <TutorSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-6">Add New Question</h1>

        <form
          onSubmit={handleOnSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          {/* Question Field */}
          <div className="mb-4">
            <label htmlFor="question_text" className="block text-gray-700 mb-2">
              Question Text
            </label>
            <textarea
              name="question_text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your question here"
            />
            {errors.questionText && (
              <p className="text-red-500 text-sm">{errors.questionText}</p>
            )}
          </div>

          {/* Options Section */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Options</h2>

            {options.map((option, index) => (
              <div key={index} className="flex gap-4 items-center mb-2">
                <input
                  name={`options[${index}].option_text`}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  value={option.option_text}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index].option_text = e.target.value;
                    setOptions(newOptions);
                  }}
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={`options[${index}].is_correct`}
                    checked={option.is_correct}
                    onChange={() => {
                      const newOptions = [...options];
                      newOptions[index].is_correct =
                        !newOptions[index].is_correct;
                      setOptions(newOptions);
                    }}
                  />
                  Correct
                </label>
              </div>
            ))}

            {Array.isArray(errors.options) &&
              errors.options.length > 0 &&
              errors.options.map((err, index) => (
                <p key={index} className="text-red-500 text-sm">
                  {err}
                </p>
              ))}

            {errors.correctOption && (
              <p className="text-red-500 text-sm">{errors.correctOption}</p>
            )}

            <button
              type="button"
              onClick={handleAddOption}
              className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition"
            >
              Add Option
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={(e) => handleOnSubmit(e, "addAnother")}
              type="button"
              className="w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Save and Add Another
            </button>
            <button
              onClick={(e) => handleOnSubmit(e, "finish")}
              type="button"
              className="w-full bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Save and Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TutorCreateQuestion;
