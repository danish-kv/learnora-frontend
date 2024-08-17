import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../features/admin/pages/AdminLogin";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import AdminStudent from "../features/admin/pages/AdminStudent";
import AdminTutor from "../features/admin/pages/AdminTutor";
import AdminCourse from "../features/admin/pages/AdminCourse";
import NotFound from "../components/common/NotFound";
import AuthRouteProtection from "./protectedRoutes/AuthRouteProtection";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import AdminTutorDetails from "../features/admin/pages/AdminTutorDetails";
import AdminCategory from "../features/admin/pages/AdminCategory";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <AuthRouteProtection element={<AdminLogin />} redirectTo={"/admin"} />
        }
      />



      <Route
        path=""
        element={<ProtectedRoute element={<AdminDashboard />} role={"admin"} />}
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
        path="course"
        element={<ProtectedRoute element={<AdminCourse />} role={"admin"} />}
      />
      <Route
        path="category"
        element={<ProtectedRoute element={<AdminCategory />} role={"admin"} />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
