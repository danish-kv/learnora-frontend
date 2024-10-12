import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../../redux/thunk/authThunks";
import { jwtDecode } from "jwt-decode";
import { validateLogin } from "../../../utils/validation";
import { displayToastAlert } from "@/utils/displayToastAlert";
import { AlertCircle, Mail, Lock } from "lucide-react";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AdminLogin = () => {
  const [user, setUser] = useState({ email: "", password: "", role: "admin" });
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
    setError({});

    const { isValid, errors } = validateLogin(user);

    if (isValid) {
      try {
        const res = await dispatch(Login(user)).unwrap();
        const token = jwtDecode(res.access_token);

        if (token?.is_admin) {
          displayToastAlert(200, "Logged in successfully");
          navigate("/admin/");
        } else {
          displayToastAlert(400, "You are not authorized");
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("Login error:", error);
        displayToastAlert(400, "Failed to log in. Please check your credentials.");
      }
    } else {
      setError(errors);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto my-auto bg-white shadow-lg rounded-lg overflow-hidden">

        <div className="hidden md:flex md:w-1/2 bg-indigo-600 text-white p-10 flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
          <p className="text-lg mb-4">Manage with confidence and efficiency.</p>
          <img
            src="/admin-login.jpg"
            alt="Admin Illustration"
            className="w-full mb-7 max-w-xs mx-auto  rounded-lg shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back, Admin</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={changeInput}
                  className="pl-10 block w-full"
                  placeholder="you@gmail.com"
                  required
                />
              </div>
              {error.email && (
                <p className="mt-2 text-sm text-red-600">{error.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={changeInput}
                  className="pl-10 block w-full"
                  placeholder="••••••••"
                  required
                />
              </div>
              {error.password && (
                <p className="mt-2 text-sm text-red-600">{error.password}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          {Object.keys(error).length > 0 && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please correct the errors above to proceed.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;