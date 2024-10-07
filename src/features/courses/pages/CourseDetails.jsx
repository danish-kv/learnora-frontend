import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../../components/layout/Header";
import CourseDetailsMain from "../components/CourseDetailsMain";
import CourseDetailsCard from "../components/CourseDetailsCard";
import CourseDetailsAbout from "../components/CourseDetailsAbout";
import CourseModules from "../components/CourseModules";
import CourseReview from "../components/CourseReview";
import CourseDetailTutorData from "../components/CourseDetailTutorData";
import useFetchCourseDetails from "../../tutor/hooks/useFetchCourseDetails";
import { formatDuration } from "../../../utils/format";
import Confetti from "react-confetti";

const CourseDetails = () => {
  const { slug } = useParams();
  const { courseDetails, error, loading } = useFetchCourseDetails(slug);
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (location.state?.showConfetti) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 6000);
    }
  }, [location.state]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold">Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-red-600">Error: {error}</p>
      </div>
    );
  }

  const total_duration = courseDetails?.modules.reduce((total, module) => {
    return total + module.duration;
  }, 0);

  const time = formatDuration(total_duration);

  return (
    <>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <CourseDetailsMain course={courseDetails} />

              {/* Right sidebar for small screens */}
              <div className="lg:hidden mb-6">
                <CourseDetailsCard course={courseDetails} />
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-semibold">Skill level</p>
                    <p className="text-sm">{courseDetails?.skill_level}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Time to complete</p>
                    <p className="text-sm">{time}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Modules</p>
                    <p className="text-sm">{courseDetails?.modules.length}</p>
                  </div>
                </div>
              </div>

              <CourseDetailsAbout course={courseDetails} />
              <CourseModules course={courseDetails} />
              <CourseReview reviews={courseDetails?.reviews} />
              <CourseDetailTutorData data={courseDetails} />
            </div>

            {/* Right sidebar for large screens */}
            <div className="hidden lg:block w-1/3">
              <div className="sticky top-4">
                <CourseDetailsCard course={courseDetails} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
