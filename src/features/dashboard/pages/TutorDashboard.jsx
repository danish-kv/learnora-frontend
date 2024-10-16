import React from "react";
import DashboardCard from "../components/DashboardCard";
import EnrollmentChart from "../components/EnrollmentChart";
import CourseProgressChart from "../components/CourseProgressChart ";
import RecentEnrollmentTable from "../components/RecentEnrollmentTable";
import LatestPaymentsTable from "../components/LatestPaymentsTable";
import ContestLeaderboardTable from "../components/ContestLeaderboardTable";
import RatingsTable from "../components/RatingsTable";
import useFetchTutorDashboard from "../hooks/useFetchTutorDashboard";
import { BookOpen, Eye, IndianRupeeIcon, Users } from "lucide-react";

const TutorDashboard = () => {
  const { dashboardData } = useFetchTutorDashboard();

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
    completed: dashboardData?.progress?.completed_course || 0,
    ongoing: dashboardData?.progress?.ongoing_course || 0,
    notStarted: dashboardData?.progress?.not_started_course || 0,
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <DashboardCard stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white border shadow-sm rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Enrollment Over Time</h2>
          <EnrollmentChart enrollmentData={dashboardData?.enrollment_data} />
        </div>

        <div className="p-6 bg-white border shadow-sm rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
          <CourseProgressChart courseProgressData={courseProgressData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ContestLeaderboardTable contestData={dashboardData?.recent_contests} />
        <LatestPaymentsTable paymentsData={dashboardData?.recent_purchase} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RecentEnrollmentTable
          enrollmentsData={dashboardData?.recent_enrollments}
        />
        <RatingsTable ratingsData={dashboardData?.recent_reviews} />
      </div>
    </div>
  );
};

export default TutorDashboard;
