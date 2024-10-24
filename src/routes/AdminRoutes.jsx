import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../features/admin/pages/AdminLogin";
import NotFound from "../components/common/NotFound";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import AuthRouteProtection from "./protectedRoutes/AuthRouteProtection";
import RequestedCourses from "../features/admin/pages/RequestedCourses";
import AdminRequestedCategory from "@/features/admin/pages/AdminRequestedCategory";
import AdminSalesReport from "@/features/salesReport/pages/AdminSalesReport";
const AdminDashboard = lazy(() =>
  import("../features/dashboard/pages/AdminDashboard")
);
const AdminStudent = lazy(() => import("../features/admin/pages/AdminStudent"));
const AdminTutor = lazy(() => import("../features/admin/pages/AdminTutor"));
const AdminCourse = lazy(() => import("../features/admin/pages/AdminCourse"));
const AdminTutorDetails = lazy(() =>
  import("../features/admin/pages/AdminTutorDetails")
);
const AdminCategory = lazy(() =>
  import("../features/admin/pages/AdminCategory")
);
const AdminCourseDetails = lazy(() =>
  import("../features/admin/pages/AdminCourseDetails")
);

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div>Wait bro its comming,....</div>}>
      <Routes>
        <Route
          path="login"
          element={
            <AuthRouteProtection
              element={<AdminLogin />}
              redirectTo={"/admin"}
            />
          }
        />

        <Route
          path=""
          element={
            <ProtectedRoute element={<AdminDashboard />} role={"admin"} />
          }
        />
        <Route
          path="student"
          element={<ProtectedRoute element={<AdminStudent />} role={"admin"} />}
        />
        <Route
          path="tutor"
          element={<ProtectedRoute element={<AdminTutor />} role={"admin"} />}
        />
        <Route
          path="tutor/:id"
          element={
            <ProtectedRoute element={<AdminTutorDetails />} role={"admin"} />
          }
        />
        <Route
          path="courses"
          element={<ProtectedRoute element={<AdminCourse />} role={"admin"} />}
        />
        <Route
          path="course/:slug"
          element={
            <ProtectedRoute element={<AdminCourseDetails />} role={"admin"} />
          }
        />
        <Route
          path="course/requested"
          element={
            <ProtectedRoute element={<RequestedCourses />} role={"admin"} />
          }
        />
        <Route
          path="category"
          element={
            <ProtectedRoute element={<AdminCategory />} role={"admin"} />
          }
        />
        <Route
          path="requested-category"
          element={
            <ProtectedRoute element={<AdminRequestedCategory />} role={"admin"} />
          }
        />
        <Route
          path="sales-report"
          element={
            <ProtectedRoute element={<AdminSalesReport />} role={"admin"} />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
