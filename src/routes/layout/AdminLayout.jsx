import React from "react";
import AdminSidebar from "@/features/admin/components/AdminSidebar";
import AdminHeader from "@/features/admin/components/AdminHeader";
import { useSelector } from "react-redux";

const AdminLayout = ({ children }) => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <AdminHeader />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
