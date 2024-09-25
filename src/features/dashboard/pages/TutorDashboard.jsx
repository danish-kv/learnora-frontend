import React from "react";
import TutorSidebar from "@/features/tutor/components/TutorSidebar";
import DashboardCard from "../components/DashboardCard";
import EnrollmentChart from "../components/EnrollmentChart";
import CourseProgressChart from "../components/CourseProgressChart ";
import RecentEnrollmentTable from "../components/RecentEnrollmentTable";
import LatestPaymentsTable from "../components/LatestPaymentsTable";
import ContestLeaderboardTable from "../components/ContestLeaderboardTable";
import RatingsTable from "../components/RatingsTable";
import useFetchTutorDashboard from "../hooks/useFetchTutorDashboard";

const TutorDashboard = () => {
  const { dashboardData } = useFetchTutorDashboard();
  console.log(dashboardData);

  const stats = [
    {
      label: "Total Courses",
      value: dashboardData?.stats?.total_courses,
      icon: "📚",
      bgColor: "bg-blue-600",
    },
    {
      label: "Total Users",
      value: dashboardData?.stats?.enrolled_courses,
      icon: "👨‍🎓",
      bgColor: "bg-green-600",
    },
    {
      label: "Total Amount",
      value: `${dashboardData?.stats?.total_amount}`,
      icon: "💰",
      bgColor: "bg-yellow-600",
    },
    {
      label: "Total Viewers",
      value: `${dashboardData?.stats?.total_views}`,
      icon: "👀",
      bgColor: "bg-red-600",
    },
  ];

  const enrollmentData = [10, 20, 15, 25, 30, 40];
  const courseProgressData = {
    completed: dashboardData?.progress?.completed_course || 0,
    ongoing: dashboardData?.progress?.ongoing_course || 0,
    notStarted: dashboardData?.progress?.not_started_course || 0,
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <TutorSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 ml-64">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <DashboardCard
              key={index}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              bgColor={stat.bgColor}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Enrollment Over Time</h2>
            <EnrollmentChart enrollmentData={enrollmentData} />
          </div>

          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
            <CourseProgressChart courseProgressData={courseProgressData} />
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ContestLeaderboardTable
            contestData={dashboardData?.recent_contests}
          />
          <LatestPaymentsTable paymentsData={dashboardData?.recent_purchase} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RecentEnrollmentTable
            enrollmentsData={dashboardData?.recent_enrollments}
          />
          <RatingsTable ratingsData={dashboardData?.recent_reviews} />
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
