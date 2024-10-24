import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import TutorCard from "../components/TutorCard";
import api from "../../../services/api";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import useFetchTutor from "../hooks/useFetchTutor";
import { Search, Filter, ChevronRightIcon, HomeIcon } from "lucide-react";
import CardSkeleton from "@/skeleton/CardSkeleton";

const AdminTutor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const { tutors, getTutors, loading } = useFetchTutor();
  const [filteredTutors, setFilteredTutors] = useState([]);

  useEffect(() => {
    setFilteredTutors(
      tutors
        .filter(
          (tutor) =>
            (
              tutor.user?.first_name.toLowerCase() +
              " " +
              tutor.user?.last_name.toLowerCase()
            ).includes(searchQuery.toLowerCase()) ||
            tutor.user?.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((tutor) => statusFilter === "" || tutor.status === statusFilter)
    );
  }, [tutors, searchQuery, statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`tutor/${id}/`, { status: newStatus });
      displayToastAlert(200, "Status updated successfully");
      getTutors();
    } catch (error) {
      console.error("Change status error:", error);
      const status = error?.response?.status || 400;
      const message =
        error?.response?.data?.status?.[0] ||
        "We are facing some issues. Please try again";
      displayToastAlert(status, message);
    }
  };

  const handleBlockToggle = async (id, current_status) => {
    try {
      await api.patch(`user/${id}/status/`, { is_active: !current_status });
      getTutors();
      displayToastAlert(
        200,
        `Tutor ${current_status ? "blocked" : "unblocked"} successfully`
      );
    } catch (error) {
      console.error("Block toggle error:", error);
      displayToastAlert(
        400,
        "Failed to update tutor status. Please try again later"
      );
    }
  };

  const handleCardClick = (tutorId) => {
    navigate(`/admin/tutor/${tutorId}`);
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-2 sm:mb-0">
            Tutor's
          </h1>
        </div>
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/admin"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                <HomeIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </li>

            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  Tutor's
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow md:max-w-md">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto pl-10 pr-8 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Requested">Requested</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Blocked">Blocked</option>
            </select>
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [...Array(6)].map((_, index) => <CardSkeleton key={index} />)
            : filteredTutors.map((tutor) => (
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
    </main>
  );
};

export default AdminTutor;
