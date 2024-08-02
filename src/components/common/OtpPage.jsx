import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThreeDot } from "react-loading-indicators";

const OtpPage = () => {
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const { email } = location.state || {};
  console.log(email);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Entered OTP is:", otp.join(""));
    const otpString = otp.join("");
    setLoading(true);
    try {
      const res = await api.post("otp-verify/", { email, otp: otpString });
      toast.success("OTP verified successfully!");
      navigate("/login");
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await api.post("otp-resend/", { email });
      toast.success("OTP resend successfully");
      setTimer(60);
      setResendDisabled(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed to resend otp, please try again");
    } finally {
      setLoading(false);
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
                className="w-12 h-12 m-2 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
          >
            {loading ? (
              <ThreeDot color="#fff" size="medium" text="" textColor="" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <div className="text-center mt-3">
          {timer > 0 ? (
            `Resend OTP in ${timer}s`
          ) : (
            <button
              onClick={handleResendOtp}
              className="mt-6 text-center bg-blue-500 p-1 border-red-50 border-2	rounded text-yellow-100"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
