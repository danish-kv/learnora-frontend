import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingDotStream from "../../../components/common/Loading";
import { validateLogin } from "../../../utils/validation";
import authService from "../../../services/authService";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleOtpAccess,
  tutorApplication,
} from "../../../redux/slices/authSlice";
import { Login } from "../../../redux/thunk/authThunks";
import { jwtDecode } from "jwt-decode";
import swal from "sweetalert";

const TutorLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "tutor",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  dispatch(tutorApplication(false));

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    const { isValid, errors } = validateLogin(formData);

    if (isValid) {
      console.log("from submited");

      try {
        const res = await dispatch(Login(formData)).unwrap();
        console.log(res);
        console.log(res.res.access_token);
        const token = jwtDecode(res.access_token);
        console.log("token ===> ", token);

        if (res.role === "tutor") {
          if (!token.is_active) {
            await swal("Blocked", "Admin blocked you.", "error");
          } else {
            navigate("/tutor");
            displayToastAlert(200, "Welcome back Tutor");
          }
        } else {
          console.log("not a tutor");

          // displayToastAlert(400, "Not a Tutor");
        }
      } catch (error) {
        console.log(error);
        if (error.error === "User not verified") {
          await swal(
            "Email Not Verified",
            "Please verify your email. Check your email for an OTP.",
            "error"
          );
          dispatch(toggleOtpAccess(true));
          navigate("/otp", {
            state: { email: formData.email, is_tutor: true, for_verify: true },
          });
        } else if (error.error === "Application status is pending") {
          await swal(
            "Application Incomplete",
            "Please complete your tutor application to proceed.",
            "info"
          );
          dispatch(tutorApplication(true));
          navigate("/tutor/application", { state: { email: formData.email } });

        }else if (error.error === "Application status is requested") {
          navigate("/tutor/application/done");
          console.log('not accepted applcaitoin');
          
        }else if (error.error === "Application status is rejected") {
          await swal(
            "Application Rejected",
            "Unfortunately, your application has been rejected by the admin.",
            "info"
        );
        console.log('Application has been rejected by the admin.');
          
        }
      }
    } else {
      setErrors(errors);
      displayToastAlert(300, "Please fix the validation errors");
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-blue-100">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 bg-blue-200 flex items-center justify-center">
          <div className="text-center p-10">
            <img
              src="/tutor-login.jpg"
              alt="Illustration"
              className="mb-4 max-w-xs max-h-100 object-contain mx-auto"
            />
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome Back!
            </h2>
            <p className="text-white">
              Log in to access your account and continue learning.
            </p>
          </div>
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleOnChange}
                value={formData.email}
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleOnChange}
                value={formData.password}
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
            <div className="mb-4 flex items-center justify-between">
              <Link to={"/forget-password"}>
                <p className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </p>
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
             
            >
              {loading ? <LoadingDotStream /> : "Log In"}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/tutor/register">
              <a className="text-blue-600 hover:underline">Sign Up</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorLogin;
