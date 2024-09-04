import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/common/NotFound";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import AuthRouteProtection from "./protectedRoutes/AuthRouteProtection";
import TutorCategories from "@/features/tutor/pages/TutorCategories";

const TutorRegister = lazy(() =>
  import("../features/tutor/pages/TutorRegister")
);
const TutorLogin = lazy(() => import("../features/tutor/pages/TutorLogin"));
const TutorApplication = lazy(() =>
  import("../features/tutor/pages/TutorApplication")
);
const TutorDashboard = lazy(() =>
  import("../features/tutor/pages/TutorDashboard")
);
const TutorCourse = lazy(() => import("../features/tutor/pages/TutorCourse"));
const TutorProfile = lazy(() => import("../features/tutor/pages/TutorProfile"));
const TutorCourseDetails = lazy(() =>
  import("../features/tutor/pages/TutorCourseDetails")
);
const TutorApplicationDone = lazy(() =>
  import("../features/tutor/pages/TutorApplicationDone")
);
const TutorEditCourse = lazy(() =>
  import("../features/tutor/pages/TutorEditCourse")
);
const TutorCreateCourse = lazy(() =>
  import("../features/tutor/pages/TutorCreateCourse")
);
const TutorCreateModule = lazy(() =>
  import("../features/tutor/pages/TutorCreateModule")
);
const TutorEditModule = lazy(() =>
  import("../features/tutor/pages/TutorEditModule")
);

const TutorRoutes = () => {
  return (
    <Suspense fallback={<div>wait its cooming</div>}>
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
            <AuthRouteProtection
              element={<TutorLogin />}
              redirectTo={"/tutor"}
            />
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

        <Route path="application/done" element={<TutorApplicationDone />} />
        <Route
          path=""
          element={
            <ProtectedRoute element={<TutorDashboard />} role={"tutor"} />
          }
        />
        <Route
          path="courses"
          element={<ProtectedRoute element={<TutorCourse />} role={"tutor"} />}
        />
        <Route
          path="profile"
          element={<ProtectedRoute element={<TutorProfile />} role={"tutor"} />}
        />
        <Route
          path="new-course"
          element={
            <ProtectedRoute element={<TutorCreateCourse />} role={"tutor"} />
          }
        />
        <Route
          path="course/:slug"
          element={
            <ProtectedRoute element={<TutorCourseDetails />} role={"tutor"} />
          }
        />
        <Route
          path="new-module/:id"
          element={
            <ProtectedRoute element={<TutorCreateModule />} role={"tutor"} />
          }
        />
        <Route
          path="course/edit/:slug"
          element={
            <ProtectedRoute element={<TutorEditCourse />} role={"tutor"} />
          }
        />
        <Route
          path="module/edit/:id"
          element={
            <ProtectedRoute element={<TutorEditModule />} role={"tutor"} />
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute element={<TutorCategories />} role={"tutor"} />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default TutorRoutes;
