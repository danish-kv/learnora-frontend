import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Signup } from "../../../redux/thunk/authThunks";
import { toggleOtpAccess } from "../../../redux/slices/authSlice";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { validateRegistration } from "../../../utils/validation";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import LoadingDotStream from "../../../components/common/Loading";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
  });
  const [errors, setErrors] = useState({});
  const { handleSignInWithGoogle } = useGoogleAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if (location.state?.TutorRegister) {
      setFormData((prev) => ({ ...prev, role: "tutor" }));
    } else {
      setFormData((prev) => ({ ...prev, role: "student" }));
    }
  }, [location.state]);

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: onGoogleSignIn,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      text: "signup_with",
      width: "780",
    });
  }, [formData.role]);

  const onGoogleSignIn = async (res) => {
    try {
      await handleSignInWithGoogle(res, formData.role, "register");
    } catch (error) {
      console.error("Google Sign-Up Error: ", error);
      displayToastAlert(400, "Google Sign-Up failed. Please try again.");
    }
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateRegistration(formData);

    if (isValid) {
      try {
        const res = await dispatch(Signup(formData)).unwrap();
        console.log(res);
        dispatch(toggleOtpAccess(true));
        if (formData.role === "student") {
          navigate("/otp", { state: { email: formData.email } });
        } else {
          navigate("/otp", {
            state: { email: formData.email, is_tutor: true },
          });
        }
      } catch (error) {
        console.log("Signup error== ", error);
      }
    } else {
      setErrors(errors);
      displayToastAlert(400, "Please fix the validation errors");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side */}
      <div className="hidden md:flex w-1/3 bg-indigo-900 fixed left-0 top-0 h-full items-center justify-center">
        <div className="p-2 rounded-full bg-white shadow-lg">
          <img
            src="/logo-cropped.png"
            alt="Logo"
            className="w-20 h-20 rounded-full"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="w-full md:w-2/3 md:ml-[33.333333%] overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-6 py-12 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-left text-3xl font-bold text-gray-900">
                Register
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
                    htmlFor="username"
                    className="inline-block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={formData.username}
                    onChange={handleOnChange}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>
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
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                    autoComplete="new-password"
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

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? <LoadingDotStream /> : "Sign up"}
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

                <div className="mt-6">
                  <div id="signInDiv" className="w-full"></div>
                </div>
              </div>
            )}

            <p className="mt-4 text-left text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
