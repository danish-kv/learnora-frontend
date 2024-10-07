import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentRoutes from "./routes/StudentRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import TutorRoutes from "./routes/TutorRoutes";
import NotAuthorized from "./components/common/NotAuthorized";
import SendNotification from "./features/notification/SendNotification";
import { useSelector } from "react-redux";

const App = () => {
  const userID = useSelector((state) => state.auth.id);
  console.log(userID);

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
        <SendNotification userID={userID} />
      </BrowserRouter>
    </>
  );
};

export default App;
