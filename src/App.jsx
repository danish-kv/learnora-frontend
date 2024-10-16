import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentRoutes from "./routes/StudentRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import NotAuthorized from "./components/common/NotAuthorized";
import SendNotification from "./features/notification/SendNotification";
import { useSelector } from "react-redux";
import TutorLayout from "./routes/TutorLayout";
import { Toaster } from "react-hot-toast";

const App = () => {
  const userID = useSelector((state) => state.auth.id);
  console.log(userID);

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />{" "}
        <Routes>
          <Route path="/*" element={<StudentRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/tutor/*" element={<TutorLayout />} />
          <Route path="/unauthorized/" element={<NotAuthorized />} />
        </Routes>
        <SendNotification userID={userID} />
      </BrowserRouter>
    </>
  );
};

export default App;
