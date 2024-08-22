import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import TutorCard from "../components/TutorCard";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import { ToastContainer } from "react-toastify";
import useFetchTutor from "../hooks/useFetchTutor";

const AdminTutor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();
  const { tutors, refech } = useFetchTutor();

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.patch(`tutor/${id}/`, {
        status: newStatus,
      });
      displayToastAlert(200, "success");
      refech();
    } catch (error) {
      console.log("change status error ===", error);
      const status = error?.response?.status || 400;
      const message =
        error?.response?.data?.status?.[0] ||
        "We are facing some issue. Please try again";
      displayToastAlert(status, message);
    }
  };

  const handleBlockToggle = async (id, current_status) => {
    try {
      const res = await api.patch(`user/${id}/status/`, {
        is_active: !current_status,
      });
      refech();
    } catch (error) {
      console.log("error == ", error);
    }
  };

  const handleCardClick = (tutorId) => {
    navigate(`/admin/tutor/${tutorId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <ToastContainer />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 ml-64">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Tutors</h3>
            {/* Search and Filter Section */}
            <div className="mt-4 flex justify-between">
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-1/3"
              />
              <div className="flex gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Requested">Requested</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
            </div>
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutors.map((tutor) => (
                  <TutorCard
                    key={tutor.id}
                    tutor={tutor}
                    onStatusChange={handleStatusChange}
                    onBlockToggle={handleBlockToggle}
                    onClick={() => handleCardClick(tutor.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminTutor;