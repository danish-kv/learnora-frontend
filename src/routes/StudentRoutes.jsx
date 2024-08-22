import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";
import OtpPage from "../components/common/OtpPage";
import ForgetPassword from "../features/auth/pages/ForgetPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";
import NotFound from "../components/common/NotFound";
import AuthRouteProtection from "./protectedRoutes/AuthRouteProtection";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import Courses from "../features/courses/pages/Courses";


const StudentRoutes = () => {
  return (
    <Routes>
       <Route
        path="register"
        element={
          <AuthRouteProtection element={<RegisterPage />} redirectTo={"/"} />
        }
      />
      <Route
        path="password-reset"
        element={
          <AuthRouteProtection element={<ResetPassword />} redirectTo={"/"} />
        }
      />
      <Route
        path="otp"
        element={<OtpPage />}       />
      <Route
        path="login"
        element={
          <AuthRouteProtection element={<LoginPage />} redirectTo={"/"} />
        }
      />
      <Route
        path="forget-password"
        element={
          <AuthRouteProtection element={<ForgetPassword />} redirectTo={"/"} />
        }
      />



      <Route
        path="/"
        element={<ProtectedRoute element={<HomePage />} role="student" />}
      />
      <Route
        path="course"
        element={<ProtectedRoute element={<Courses />} role="student" />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default StudentRoutes;
