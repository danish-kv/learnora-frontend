import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/common/NotFound";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import AuthRouteProtection from "./protectedRoutes/AuthRouteProtection";
import LoadingDotStream from "@/components/common/Loading";
import TutorCommunityChat from "@/features/tutor/pages/community/TutorCommunityChat";
import TutorEditQuestion from "@/features/tutor/pages/contest/TutorEditQuestion";
import TutorEditContest from "@/features/tutor/pages/contest/TutorEditContest";
import TutorProfile from "@/features/profile/tutor/pages/TutorProfile";
import TutorEditProfile from "@/features/profile/tutor/pages/TutorEditProfile";

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
const TutorCategories = lazy(() =>
  import("../features/tutor/pages/TutorCategories")
);
const TutorContest = lazy(() =>
  import("../features/tutor/pages/contest/TutorContest")
);
const TutorCreateContest = lazy(() =>
  import("../features/tutor/pages/contest/TutorCreateContest")
);

const TutorCreateQuestion = lazy(() =>
  import("../features/tutor/pages/contest/TutorCreateQuestion")
);
const TutorContestDetails = lazy(() =>
  import("../features/tutor/pages/contest/TutorContestDetails")
);
const TutorCreateCommunity = lazy(() =>
  import("../features/tutor/pages/community/TutorCreateCommunity")
);
const TutorCommunity = lazy(() =>
  import("@/features/tutor/pages/community/TutorCommunity")
);

const TutorRoutes = () => {
  return (
    <Suspense fallback={<LoadingDotStream />}>
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
        <Route
          path="/contest"
          element={<ProtectedRoute element={<TutorContest />} role={"tutor"} />}
        />
        <Route
          path="/contest/create"
          element={
            <ProtectedRoute element={<TutorCreateContest />} role={"tutor"} />
          }
        />
        <Route
          path="/contest/questions/create/:id"
          element={
            <ProtectedRoute element={<TutorCreateQuestion />} role={"tutor"} />
          }
        />
        <Route
          path="/contest/:id"
          element={
            <ProtectedRoute element={<TutorContestDetails />} role={"tutor"} />
          }
        />
        <Route
          path="/contest/:id/edit"
          element={
            <ProtectedRoute element={<TutorEditContest />} role={"tutor"} />
          }
        />
        <Route
          path="/contest/:id/question/:id/edit"
          element={
            <ProtectedRoute element={<TutorEditQuestion />} role={"tutor"} />
          }
        />


        
        <Route
          path="/community"
          element={
            <ProtectedRoute element={<TutorCommunity />} role={"tutor"} />
          }
        />
        <Route
          path="/community/create"
          element={
            <ProtectedRoute element={<TutorCreateCommunity />} role={"tutor"} />
          }
        />
        <Route
          path="/community/:slug"
          element={
            <ProtectedRoute element={<TutorCommunityChat />} role={"tutor"} />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute element={<TutorProfile />} role={"tutor"} />
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute element={<TutorEditProfile />} role={"tutor"} />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default TutorRoutes;
