import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";
import OtpPage from "../components/common/OtpPage";

const ForgetPassword = lazy(() => import("../features/auth/pages/ForgetPassword"));
const ResetPassword = lazy(() => import("../features/auth/pages/ResetPassword"));
const NotFound = lazy(() => import("../components/common/NotFound"));
const AuthRouteProtection = lazy(() => import("./protectedRoutes/AuthRouteProtection"));
const ProtectedRoute = lazy(() => import("./protectedRoutes/ProtectedRoute"));
const Courses = lazy(() => import("../features/courses/pages/Courses"));
const CourseDetails = lazy(() => import("../features/courses/pages/CourseDetails"));
const PaymentSuccess = lazy(() => import("../features/courses/payment/PaymentSuccess"));
const PaymentFailed = lazy(() => import("../features/courses/payment/PaymentFailed"));
const CourseVideoPlayer = lazy(() => import("../features/courses/pages/CourseVideoPlayer"));

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
      <Route path="otp" element={<OtpPage />} />
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
      <Route
        path="course/:slug"
        element={<ProtectedRoute element={<CourseDetails />} role="student" />}
      />
      <Route
        path="course/:slug/:id/"
        element={
          <ProtectedRoute element={<CourseVideoPlayer />} role="student" />
        }
      />

      <Route
        path="/payment_success"
        element={
          <ProtectedRoute element={<PaymentSuccess />} role={"student"} />
        }
      />
      <Route
        path="/payment_failed"
        element={
          <ProtectedRoute element={<PaymentFailed />} role={"student"} />
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default StudentRoutes;
