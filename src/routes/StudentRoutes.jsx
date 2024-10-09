import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import OtpPage from "../components/common/OtpPage";
import StudentProfile from "@/features/profile/student/pages/StudentProfile";
import DiscussionPage from "@/features/discussion/pages/DiscussionPage";
import LoadingDotStream from "@/components/common/Loading";
import ContestPage from "@/features/contest/page/ContestPage";
import ContestDetailsPage from "@/features/contest/page/ContestDetailsPage";
import ContestParticipatePage from "@/features/contest/page/ContestParticipatePage";
import CommunityPage from "@/features/community/pages/CommunityPage";
import CommunityChat from "@/features/community/pages/CommunityChat";
import VideoCallRoom from "@/features/community/pages/VideoCallRoom";
import LandingPage from "@/pages/HomePage/LandingPage";

const ForgetPassword = lazy(() =>
  import("../features/auth/pages/ForgetPassword")
);
const ResetPassword = lazy(() =>
  import("../features/auth/pages/ResetPassword")
);
const NotFound = lazy(() => import("../components/common/NotFound"));
const AuthRouteProtection = lazy(() =>
  import("./protectedRoutes/AuthRouteProtection")
);
const ProtectedRoute = lazy(() => import("./protectedRoutes/ProtectedRoute"));
const Courses = lazy(() => import("../features/courses/pages/Courses"));
const CourseDetails = lazy(() =>
  import("../features/courses/pages/CourseDetails")
);
const PaymentSuccess = lazy(() =>
  import("../features/courses/payment/PaymentSuccess")
);
const PaymentFailed = lazy(() =>
  import("../features/courses/payment/PaymentFailed")
);
const CourseVideoPlayer = lazy(() =>
  import("../features/courses/pages/CourseVideoPlayer")
);

const StudentRoutes = () => {
  return (
    <Suspense fallback={<LoadingDotStream />}>
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
            <AuthRouteProtection
              element={<ForgetPassword />}
              redirectTo={"/"}
            />
          }
        />

        <Route
          path="/"
          element={<ProtectedRoute element={<LandingPage />} role="student" />}
        />
        <Route
          path="courses"
          element={<ProtectedRoute element={<Courses />} role="student" />}
        />
        <Route
          path="course/:slug"
          element={
            <ProtectedRoute element={<CourseDetails />} role="student" />
          }
        />
        <Route
          path="course/:slug/:id/"
          element={
            <ProtectedRoute element={<CourseVideoPlayer />} role="student" />
          }
        />
        <Route
          path="profile/*"
          element={
            <ProtectedRoute element={<StudentProfile />} role="student" />
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
        <Route
          path="/discussion"
          element={
            <ProtectedRoute element={<DiscussionPage />} role={"student"} />
          }
        />
        <Route
          path="/contest"
          element={
            <ProtectedRoute element={<ContestPage />} role={"student"} />
          }
        />
        <Route
          path="/contest/:id"
          element={
            <ProtectedRoute element={<ContestDetailsPage />} role={"student"} />
          }
        />
        <Route
          path="/contest/:id/participate/"
          element={
            <ProtectedRoute
              element={<ContestParticipatePage />}
              role={"student"}
            />
          }
        />

        <Route
          path="/community/"
          element={
            <ProtectedRoute element={<CommunityPage />} role={"student"} />
          }
        />

        <Route
          path="/community/:slug"
          element={
            <ProtectedRoute element={<CommunityChat />} role={"student"} />
          }
        />
        <Route path="/community/:slug/room/" element={<VideoCallRoom />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default StudentRoutes;
