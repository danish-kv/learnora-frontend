import React from "react";
import { Route, Routes } from "react-router-dom";
import TutorRegister from "../features/tutor/pages/TutorRegister";
import TutorLogin from "../features/tutor/pages/TutorLogin";
import TutorApplication from "../features/tutor/pages/TutorApplication";
import TutorDashboard from "../features/tutor/pages/TutorDashboard";
import TutorCourse from "../features/tutor/pages/TutorCourse";
import TutorProfile from "../features/tutor/pages/TutorProfile";
import NotFound from "../components/common/NotFound";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import AuthRouteProtection from "./protectedRoutes/AuthRouteProtection";
import TutorNewCourse from "../features/tutor/pages/TutorNewCourse";
import TutorCourseDetails from "../features/tutor/pages/TutorCourseDetails";
import TutorApplicationDone from "../features/tutor/pages/TutorApplicationDone";

const TutorRoutes = () => {
  return (
    <Routes>
      <Route
        path="register"
        element={
          <AuthRouteProtection
            element={<TutorRegister />}
            redirectTo={"/tutor"}
          />
        }
      />
      <Route
        path="login"
        element={
          <AuthRouteProtection element={<TutorLogin />} redirectTo={"/tutor"} />
        }
      />
      <Route
        path="application"
        element={
          <AuthRouteProtection
            element={<TutorApplication />}
            redirectTo={"/tutor"}
          />
        }
      />

      <Route
        path="application/done"
        element={
          <TutorApplicationDone />} 
      />
      <Route
        path=""
        element={<ProtectedRoute element={<TutorDashboard />} role={"tutor"} />}
      />
      <Route
        path="course"
        element={<ProtectedRoute element={<TutorCourse />} role={"tutor"} />}
      />
      <Route
        path="profile"
        element={<ProtectedRoute element={<TutorProfile />} role={"tutor"} />}
      />
      <Route
        path="new-course"
        element={<ProtectedRoute element={<TutorNewCourse />} role={"tutor"} />}
      />
      <Route
        path="course/:slug"
        element={
          <ProtectedRoute element={<TutorCourseDetails />} role={"tutor"} />
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default TutorRoutes;
