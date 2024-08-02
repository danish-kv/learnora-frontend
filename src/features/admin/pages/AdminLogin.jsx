import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import api from "../../../services/api";
import { toast } from "react-toastify";
const AdminLogin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const changeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validate = () => {
    const errors = {};

    if (!user.email.trim()) {
      errors.email = "Email cannot be empty";
    } else if (!/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(user.email)) {
      errors.email = "Email must be valid";
    }

    if (!user.password.trim()) {
      errors.password = "Password cannot be empty";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const res = await api.post("/login/token/", user);
        console.log(res.data);
        if (res.role === 'admin'){
          
          swal("Success", "Logged in successfully", "success");
          navigate("/admin/dashboard");
        }else{
          toast.error('You are not authrized person')
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("Login error:", error);
        swal(
          "Error",
          "Failed to log in. Please check your credentials.",
          "error"
        );
      }
    } else {
      toast.error("Validation Error");
    }
  };

  return (

    <div className="flex h-screen items-center justify-center bg-green-600">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 bg-green-200 flex items-center justify-center">
          <div className="text-center p-10">
            <img
              src="/admin-login.jpg"
              alt="Illustration"
              className="mb-4 max-w-xs max-h-100 object-contain mx-auto"
            />
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              Admin Dashboard: Manage with Confidence
            </h2>
          </div>
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Welcome, Admin!
          </h2>
          <p className="text-gray-600 mb-6">
            Sign in to manage the platform and ensure everything runs smoothly.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={changeInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {error.email && (
                <p className="text-red-500 text-xs mt-1">{error.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={changeInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {error.password && (
                <p className="text-red-500 text-xs mt-1">{error.password}</p>
              )}
            </div>

            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
