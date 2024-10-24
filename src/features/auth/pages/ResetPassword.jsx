import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";
import api from "../../../services/api";
import Swal from "sweetalert2";
import { displayToastAlert } from "@/utils/displayToastAlert";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { is_tutor } = location.state || {};
  const { email } = location.state || {};
  const { is_forget } = location.state || {};

  console.log("is tutor in reset password", is_tutor);
  console.log("is email in reset password", email);
  console.log("is foret in reset password", is_forget);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (!password.trim() || !confirmPassword.trim()) {
      setError("Passwords don't match");
      return;
    }
    try {
      const res = await api.post("/forget-password/", { email, password });
      console.log(res);

      if (res.status === 201) {
        displayToastAlert(200," Password Changed Succussfully")
        if (is_tutor) {
          navigate("/login", { state: { TutorRegister: true } });
        } else {
          navigate("/login");
        }
      } else {
        displayToastAlert(400, 'Something went wrong please try again')
      }
    } catch (error) {
      console.log(error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.error || "An error occurred. Please try again",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter new password"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="confirm-password"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm new password"
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
