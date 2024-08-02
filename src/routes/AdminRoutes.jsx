import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../features/admin/pages/AdminLogin";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import AdminStudent from "../features/admin/pages/AdminStudent";
import AdminInstructor from "../features/admin/pages/AdminInstructor";
import AdminCourse from "../features/admin/pages/AdminCourse";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="" element={<AdminDashboard />} />
      <Route path="student" element={<AdminStudent />} />
      <Route path="instructor" element={<AdminInstructor />} />
      <Route path="course" element={<AdminCourse />} />
    </Routes>
  );
};

export default AdminRoutes;
