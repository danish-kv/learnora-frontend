import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentRoutes from "./routes/StudentRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import TutorRoutes from "./routes/TutorRoutes";
import NotAuthorized from "./components/common/NotAuthorized";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/*" element={<StudentRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/tutor/*" element={<TutorRoutes />} />
          <Route path="/unauthorized/" element={<NotAuthorized />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
