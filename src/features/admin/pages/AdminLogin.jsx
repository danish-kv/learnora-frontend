import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../../redux/thunk/authThunks";
import LoadingDotStream from "../../../components/common/Loading";
import { jwtDecode } from "jwt-decode";
import { validateLogin } from "../../../utils/validation";

const AdminLogin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "admin",
  });
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const navigate = useNavigate();

  const changeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    setError('')

    const { isValid, errors } = validateLogin(user);

    if (isValid) {
      try {
        const res = await dispatch(Login(user)).unwrap();
        console.log(res);
        

        const token = jwtDecode(res.access_token);
        console.log("token jwt ", token);


        if (token?.is_admin) {
          await swal("Success", "Logged in successfully", "success");
          navigate("/admin/");
        } else {
          toast.error("You are not authorized");
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
      setError(errors);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 bg-gray-200 flex items-center justify-center">
          <div className="text-center p-10">
            <img
              src="/admin-login.jpg"
              alt="Illustration"
              className="mb-4 max-w-xs max-h-100 object-contain mx-auto"
            />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
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
                htmlFor="email"
              >
                Email
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
            {loading ? (
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                <LoadingDotStream />
              </button>
            ) : (
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
