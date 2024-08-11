import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";
import OtpPage from "../components/common/OtpPage";
import ForgetPassword from "../features/auth/pages/ForgetPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<RegisterPage />} />
      <Route path="forget-reset" element={<ForgetPassword />} />
      <Route path="password-reset" element={<ResetPassword />} />
      <Route path="otp" element={<OtpPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="forget-password" element={<ForgetPassword/>} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default StudentRoutes;
