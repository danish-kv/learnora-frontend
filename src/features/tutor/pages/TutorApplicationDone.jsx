import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { tutorApplicationDone } from "../../../redux/slices/authSlice";

const TutorApplicationDone = () => {
  const { tutorApplicationDoneAccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("access", tutorApplicationDoneAccess);

  useEffect(() => {
    if (!tutorApplicationDoneAccess) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md max-w-lg w-full p-6">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-200 rounded-full p-3">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Thanks for applying as a tutor!
        </h2>

        <p className="text-gray-600 mb-4">
          We will review your application and get back to you as soon as
          possible. Generally, you should hear from us within 5-10 working days.
        </p>

        <p className="text-gray-600 mb-6">
          You will receive an email at your registered address with next steps.
        </p>
        <Link to={"/"}>
          <button
            onClick={() => dispatch(tutorApplicationDone(false))}
            className="w-full bg-indigo-400 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            ← Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TutorApplicationDone;
