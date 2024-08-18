import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateLogin } from "../../../utils/validation";
import authService from "../../../services/authService";
import { toast } from "react-toastify";
import LoadingDotStream from "../../../components/common/Loading";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../../redux/thunk/authThunks";
import { toggleOtpAccess } from "../../../redux/slices/authSlice";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import Header from "../../../components/layout/Header";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [errors, setErrors] = useState({});
  const { handleSignInWithGoogle } = useGoogleAuth();
  const navigate = useNavigate();
  const dispath = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  console.log("loading in ", loading);

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: onGoogleSignIn,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      text: "continue_with",
      width: "780",
    });
  }, []);

  const onGoogleSignIn = async (res) => {
    await handleSignInWithGoogle(res, "student", "login");
  };

  const handleOnChange = (e) => {
    console.log(formData);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit called");
    e.preventDefault();

    console.log(formData.email, formData.password);

    const { isValid, errors } = validateLogin(formData);
    console.log(isValid, errors);

    if (isValid) {
      // setLoading(true);
      console.log("form submitted");

      try {
        const res = await dispath(Login(formData)).unwrap();
        console.log("res of res ====>", res);

        if (res.role === "student") {
          navigate("/");
          displayToastAlert(200, "Welcome back!");
        } else {
          displayToastAlert(400, "Not a authorized person");
        }
      } catch (error) {
        console.log(error);
        if (error.status == 403) {
          dispath(toggleOtpAccess(true));
          await displayToastAlert(100, "Verification Incomplete");
          navigate("otp/", { state: { email } });
        }
      }
    } else {
      setErrors(errors);
      toast.error("Please fix the errors");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="w-1/2 bg-indigo-300 p-12 flex flex-col justify-between">
        <div className="text-white">
          {/* <h2 className="text-3xl font-bold mb-4">Knowledge Unleashed,</h2>
          <h2 className="text-3xl font-bold">Virtually Limitless</h2> */}
        </div>
        <div className="illustration ">
          {/* <img src='/3974104.jpg' alt="image" className='size-96' /> */}
        </div>
      </div>

      {/* Right side */}
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-6">Hello ! Welcome back</h1>
        <p className="mb-6">
          Log in with your data that you entered during Your registration
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              required
              onChange={handleOnChange}
              value={formData.email}
              placeholder="Email address"
              className={`w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-600 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              required
              onChange={handleOnChange}
              value={formData.password}
              placeholder="Password"
              className={`w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-600 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4 text-right">
            <Link to="/forget-password">
              <p className="text-indigo-500">Forgot Password</p>
            </Link>
          </div>
          <button className="w-full bg-indigo-500 text-white p-2 rounded mb-4">
            {loading ? <LoadingDotStream /> : "Login"}
          </button>
          <div className="text-center mb-4">OR</div>
          <button
            id="signInDiv"
            className="w-full    flex items-center justify-center"
          ></button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/register">
            Don't have an account? <p className="text-indigo-500">Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
