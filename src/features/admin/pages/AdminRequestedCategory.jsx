import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../services/api";
import UseFetchCategory from "../hooks/UseFetchCategory";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import { Link } from "react-router-dom";
import UseFetchRequestedCategory from "../hooks/UseFetchRequestedCategory";

const AdminRequestedCategory = () => {
  const { error, category, loading, getRequestedCategory } =
    UseFetchRequestedCategory();

  console.log(category);

  const handleStatus = async (id, newStatus) => {
    if (newStatus === "Approved") {
      try {
        const res = await api.patch(`requested-category/${id}/`, {
          status: "Approved",
        });
        console.log(res);

        displayToastAlert(200, "Category Approved!");
        getRequestedCategory();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await api.delete(`requested-category/${id}/`);
        console.log(res);

        displayToastAlert(200, "Category Declined!");
        getRequestedCategory();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminHeader />
        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Requested Categories
            </h2>
          </div>

          {/* List of Categories  */}
          <div className="flex flex-col space-y-4">
            {category &&
              category.map((category) => (
                <div
                  key={category.id}
                  className="bg-white shadow-md rounded-md p-4 flex justify-between items-center"
                >
                  <span className="text-gray-700 text-lg">{category.name}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatus(category.id, "Approved")}
                      className={
                        "bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition duration-200"
                      }
                    >
                      Approved
                    </button>
                    <button
                      onClick={() => handleStatus(category.id, "Decline")}
                      className={
                        "bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition duration-200"
                      }
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRequestedCategory;
