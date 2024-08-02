import React from "react";
import { Route, Routes } from "react-router-dom";
import InstructorRegister from "../features/instructor/pages/InstructorRegister";
import InstructorCourse from "../features/instructor/pages/InstructorCourse";
import InstructorDashboard from "../features/instructor/pages/InstructorDashboard";
import InstructorProfile from "../features/instructor/pages/InstructorProfile";
import InstructorLogin from "../features/instructor/pages/InstructorLogin";

const InstructorRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<InstructorRegister />} />
      <Route path="login" element={<InstructorLogin />} />
      <Route path="" element={<InstructorDashboard />} />
      <Route path="course" element={<InstructorCourse />} />
      <Route path="profile" element={<InstructorProfile />} />
    </Routes>
  );
};

export default InstructorRoutes;
