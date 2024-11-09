import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../../redux/thunk/authThunks";
import {
  toggleOtpAccess,
  tutorApplication,
  tutorApplicationDone,
} from "../../../redux/slices/authSlice";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { validateLogin } from "../../../utils/validation";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import LoadingDotStream from "../../../components/common/Loading";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [errors, setErrors] = useState({});
  const { handleSignInWithGoogle } = useGoogleAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  console.log(formData);
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: onGoogleSignIn,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      text: "signin_with",
      width: "780",
    });
  }, [formData.role]);

  const onGoogleSignIn = async (res) => {
    await handleSignInWithGoogle(res, formData.role, "login");
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateLogin(formData);

    if (!isValid) {
      setErrors(errors);
      displayToastAlert(400, "Please fix the errors");
      return;
    }

    try {
      const res = await dispatch(Login(formData)).unwrap();

      if (res.role === formData.role) {
        const token = jwtDecode(res.access_token);
        console.log("token ===> ", token);

        if (!token.is_active) {
          displayToastAlert(400, 'Admin Blocked You!!')
          return;
        }

        handleNavigation(res.role);
        setTimeout(() => {
          displayToastAlert(200, "Welcome back!");
        }, 1600);
      } else {
        displayToastAlert(400, "Not an authorized person");
      }
    } catch (error) {
      handleLoginErrors(error);
    }
  };

  const handleNavigation = (role) => {
    if (role === "tutor") {
      navigate("/tutor");
    } else if (role === "student") {
      navigate("/");
    }
  };

  const handleLoginErrors = async (error) => {
    if (error?.error === "User not verified") {
      await Swal.fire(
        "Email Not Verified",
        "Please verify your email. Check your email for an OTP.",
        "error"
      );
      dispatch(toggleOtpAccess(true));
      navigateToOtpPage(formData.role);
    } else if (
      error?.error === "Application status is pending" &&
      formData.role === "tutor"
    ) {
      await handlePendingApplication();
    } else if (
      error?.error === "Application status is requested" &&
      formData.role === "tutor"
    ) {
      handleRequestedApplication();
    } else if (
      error?.error === "Application status is rejected" &&
      formData.role === "tutor"
    ) {
      await Swal.fire(
        "Application Rejected",
        "Unfortunately, your application has been rejected by the admin.",
        "info"
      );
    }
  };

  const navigateToOtpPage = (role) => {
    if (role === "student") {
      navigate("/otp", { state: { email: formData.email } });
    } else if (role === "tutor") {
      navigate("/otp", {
        state: {
          email: formData.email,
          is_tutor: true,
          for_verify: true,
        },
      });
    }
  };

  const handlePendingApplication = async () => {
    await Swal.fire(
      "Application Incomplete",
      "Please complete your tutor application to proceed.",
      "info"
    );
    dispatch(tutorApplication(true));
    navigate("/tutor/application", {
      state: { email: formData.email },
    });
  };

  const handleRequestedApplication = () => {
    dispatch(tutorApplicationDone(true));
    navigate("/tutor/application/done");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side - Fixed */}
      <div className="hidden md:flex w-1/3 bg-indigo-900 fixed left-0 top-0 h-full items-center justify-center">
        <div className="p-2 rounded-full bg-white shadow-lg">
          <Link to={"/"}>
            <img
              src="/logo-cropped.png"
              alt="Logo"
              className="w-20 h-20 rounded-full"
            />
          </Link>
        </div>
      </div>

      {/* Right side  */}
      <div className="w-full md:w-2/3 md:ml-[33.333333%] overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-6 py-12 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-left text-3xl font-bold text-gray-900">
                Log in
              </h2>
            </div>
            <div className="mt-8">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex" aria-label="Tabs">
                  <button
                    className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      formData.role === "student"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, role: "student" })
                    }
                  >
                    I'm a student
                  </button>
                  <button
                    className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      formData.role === "tutor"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setFormData({ ...formData, role: "tutor" })}
                  >
                    I'm a tutor
                  </button>
                </nav>
              </div>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label
                    htmlFor="email"
                    className="inline-block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={formData.email}
                    onChange={handleOnChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="inline-block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={formData.password}
                    onChange={handleOnChange}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forget-password/"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? <LoadingDotStream /> : "Sign in"}
                </button>
              </div>
            </form>

            {formData.role === "student" && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <div id="signInDiv"></div>
                </div>
              </div>
            )}

            <p className="mt-4 text-left text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
