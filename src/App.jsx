import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentRoutes from "./routes/StudentRoutes";
import InstructorRoutes from "./routes/InstructorRoutes";
import AdminRoutes from "./routes/AdminRoutes";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/*" element={<StudentRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/instructor/*" element={<InstructorRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
