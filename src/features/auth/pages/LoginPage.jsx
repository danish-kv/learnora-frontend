import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateLogin } from "../../../utils/validation";
import authService from "../../../services/authService";
import { toast } from "react-toastify";
import { ThreeDot } from "react-loading-indicators";
import LoadingDotStream from "../../../components/common/Loading";
import { dispalyToastAlert } from "../../../utils/displayToastAlert";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    console.log("Default form submission prevented");

    const { isValid, errors } = validateLogin({ email, password });
    console.log(isValid, errors);

    if (isValid) {
      setLoading(true);
      console.log("form submitted");

      try {
        const data = await authService.login(email, password);
        if (data.role === "student") {
          navigate("/");
          toast.success('Welcome back!')
        }else{
          toast.error('Not a authorized person')
        }
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(errors);
      toast.error("Please fix the errors");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="w-1/2 bg-indigo-400 p-12 flex flex-col justify-between">
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
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
            <Link to='forget_password' >
            <a  className="text-indigo-500">
              Forgot Password
            </a>
             </Link>
          </div>
          <button className="w-full bg-indigo-500 text-white p-2 rounded mb-4">
            {loading ? <LoadingDotStream /> : "Login"}
          </button>
          <div className="text-center mb-4">OR</div>
          <button
            type="button"
            className="w-full border border-gray-300 p-2 rounded flex items-center justify-center"
          >
            <img src="google-icon.png" alt="Google" className="mr-2" />
            Sign with Google
          </button>
        </form>
        <button className="bg-black text-white" onClick={dispalyToastAlert(200,'hola give how are ')}>click</button>

        <div className="mt-6 text-center">
          <Link to="/register">
            Don't have an account?{" "}
            <a href="#" className="text-indigo-500">
              Sign Up
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
