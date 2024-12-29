import React from "react";
import { BookOpen, Eye, IndianRupeeIcon, Users } from "lucide-react";
import DashboardCard from "../components/DashboardCard";
import EnrollmentChart from "../components/EnrollmentChart";
import CourseProgressChart from "../components/CourseProgressChart ";
import RecentEnrollmentTable from "../components/RecentEnrollmentTable";
import LatestPaymentsTable from "../components/LatestPaymentsTable";
import ContestLeaderboardTable from "../components/ContestLeaderboardTable";
import RatingsTable from "../components/RatingsTable";
import useFetchAdminDashboard from "../hooks/useFetchAdminDashboard";

const AdminDashboard = () => {
  const { dashboardData } = useFetchAdminDashboard();

  const stats = [
    {
      label: "Total Courses",
      value: dashboardData?.stats?.total_courses,
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      label: "Total Users",
      value: dashboardData?.stats?.enrolled_courses,
      icon: Users,
      color: "text-green-600",
    },
    {
      label: "Total Amount",
      value: dashboardData?.stats?.total_amount,
      icon: IndianRupeeIcon,
      color: "text-yellow-600",
    },
    {
      label: "Total Viewers",
      value: dashboardData?.stats?.total_views,
      icon: Eye,
      color: "text-purple-600",
    },
  ];

  const courseProgressData = {
    completed: dashboardData?.progress?.completed_courses || 0,
    ongoing: dashboardData?.progress?.ongoing_courses || 0,
    notStarted: dashboardData?.progress?.not_started_courses || 0,
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 mt-10">
      {" "}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-2 sm:mb-0">
            Dashboard
          </h1>
        </div>

        <DashboardCard stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Enrollment Over Time</h2>
            <EnrollmentChart enrollmentData={dashboardData?.enrollment_data} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
            <CourseProgressChart courseProgressData={courseProgressData} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Contest Leaderboard</h2>
            <ContestLeaderboardTable
              contestData={dashboardData?.recent_contests}
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Latest Payments</h2>
            <LatestPaymentsTable
              paymentsData={dashboardData?.recent_purchases}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Enrollments</h2>
            <RecentEnrollmentTable
              enrollmentsData={dashboardData?.recent_enrollments}
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Ratings</h2>
            <RatingsTable ratingsData={dashboardData?.recent_reviews} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
