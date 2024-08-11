import React from "react";
import { Route, Routes } from "react-router-dom";
import TutorRegister from "../features/tutor/pages/TutorRegister";
import TutorLogin from "../features/tutor/pages/TutorLogin";
import TutorApplication from "../features/tutor/pages/TutorApplication";
import TutorDashboard from "../features/tutor/pages/TutorDashboard";
import TutorCourse from "../features/tutor/pages/TutorCourse";
import TutorProfile from "../features/tutor/pages/TutorProfile";

const TutorRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<TutorRegister />} />
      <Route path="login" element={<TutorLogin />} />
      <Route path="application" element={<TutorApplication />} />
      <Route path="" element={<TutorDashboard />} />
      <Route path="course" element={<TutorCourse />} />
      <Route path="profile" element={<TutorProfile />} />
    </Routes>
  );
};

export default TutorRoutes;
