import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleOtpAccess,
  tutorApplication,
} from "../../redux/slices/authSlice";
import LoadingDotStream from "./Loading";
import { displayToastAlert } from "@/utils/displayToastAlert";

const OtpPage = () => {
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { otp_access } = useSelector((state) => state.auth);

  const { email } = location.state || {};
  const { is_tutor } = location.state || {};
  const { is_forget } = location.state || {};
  const { for_verify } = location.state || {};

  useEffect(() => {
    if (!otp_access || !email) {
      if (is_tutor) {
        navigate("/login", { state: { TutorRegister: true } });
      } else {
        navigate("/login");
      }
    } else {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    setError("");

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length < 5) {
      setError("Enter 5 digits OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("otp-verify/", { email, otp: otpString });
      if (res.status === 200) {
        dispatch(toggleOtpAccess(false));
        displayToastAlert(200, "OTP verified successfully!");

        if (is_forget) {
          navigate("/password-reset", {
            state: { email, is_tutor, is_forget },
          });
        } else if ((is_tutor, for_verify)) {
          navigate("/login", { state: { TutorRegister: true } });
        } else if (is_tutor) {
          dispatch(tutorApplication(true));
          navigate("/tutor/application ", { state: { email } });
        } else {
          navigate("/login");
        }
      } else {
        console.log(res);
      }
    } catch (error) {
      displayToastAlert(400, "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      await api.post("otp-resend/", { email });
      displayToastAlert(200, "OTP resend successfully");
      setTimer(60);
      setResendDisabled(true);
    } catch (error) {
      displayToastAlert(400, "Failed to resend otp, please try again");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-center text-2xl font-bold mb-6">Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className={`w-12 h-12 m-2 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                  error ? "border-red-500" : ""
                }`}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[index]) {
                    if (e.target.previousSibling) {
                      e.target.previousSibling.focus();
                    }
                  }
                }}
              />
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-xs text-center mt-1">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-700 text-white py-2 rounded-md hover:bg-indigo-800 transition duration-200"
          >
            {loading ? <LoadingDotStream /> : "Submit"}
          </button>
        </form>
        <div className="text-center mt-3">
          {timer > 0 ? (
            `Resend OTP in ${timer}s`
          ) : (
            <button
              onClick={handleResendOtp}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
              disabled={resendDisabled || resendLoading}
            >
              {resendLoading ? <LoadingDotStream /> : "Resend OTP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
