import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Riple, ThreeDot } from 'react-loading-indicators'
import authService from "../../../services/authService";
import { validateRegistration } from "../../../utils/validation";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux'


const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const dispath = useDispatch()
    const navigate = useNavigate();

      const loading = useSelector((state) => state.auth.loading)
      const message = useSelector((state) => state.auth.message)
      console.log(loading);
      console.log(message);
      
    
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const { isValid, errors } = validateRegistration({ username, email, password })
  
  
      if (isValid) {
        setLoading(true);
        console.log("Form submitted");
  
        try {
          await authService.register(email, password, username, 'student');
          navigate('/otp',{state : { email }});
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }else{
        setErrors(errors)
        toast.error("Please fix the validation errors");
      }
    };
  
    return (
      <div className="flex h-screen items-center justify-center bg-indigo-100">
        <div className="flex bg-white shadow-lg rounded-lg overflow-hidden ">
          <div className="w-1/2 bg-indigo-200 flex items-center justify-center">
            <div className="text-center p-10">
              <img
                src='/3974104.jpg'
                alt="Illustration"
                className="mb-4 max-w-xs max-h-100 object-contain mx-auto"
              />
              <h2 className="text-2xl font-bold text-white mb-2">
                Elevate Learning: Anytime, Anywhere, Your Pace.
              </h2>
            </div>
          </div>
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Join our vibrant community!
            </h2>
            <p className="text-gray-600 mb-6">
              Sign up now to unlock exclusive perks and endless possibilities!
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600 ${
                    errors.username ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your name"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div className="mb-4 flex items-center justify-between">
                <a href="#" className="text-sm text-indigo-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200">
                {loading ?  <ThreeDot color="#fff" size="medium" text="" textColor="" />: 'Register'}
              </button>
            </form>
            <div className="my-4 text-center text-gray-600">OR</div>
            <button className="w-full bg-white border border-gray-300 text-gray-600 py-2 rounded-md hover:bg-gray-50 transition duration-200 flex items-center justify-center">
              <img src="  " alt="Google" className="h-6 w-6 mr-2" />
              Sign up with Google
            </button>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <Link to='/login' >
              <a href="#" className="text-indigo-600 hover:underline">
                Log In
              </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };

export default RegisterPage