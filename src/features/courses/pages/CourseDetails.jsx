import React from "react";
import CourseModules from "../components/CourseModules";
import Header from "../../../components/layout/Header";
import CourseDetailsCard from "../components/CourseDetailsCard";
import CourseDetailsAbout from "../components/CourseDetailsAbout";
import useFetchCourseDetails from "../../tutor/hooks/useFetchCourseDetails";
import { useParams } from "react-router-dom";
import CourseDetailsMain from "../components/CourseDetailsMain";
import { formatDuration } from "../../../utils/format";
import CourseReview from "../components/CourseReview";
import CourseDetailTutorData from "../components/CourseDetailTutorData";

const CourseDetails = () => {
  const { slug } = useParams();
  const { courseDetails, error, refetch, loading } =
    useFetchCourseDetails(slug);

  if (loading) {
    return (
      <div>
        <p>Loading course details...</p>
      </div>
    );
  }

  console.log("eerroorr", error);

  const total_duration = courseDetails?.modules.reduce((total, module) => {
    return total + module.duration;
  }, 0);

  const time = formatDuration(total_duration);
  console.log(time);

  console.log("total duration of ", total_duration);

  const check = courseDetails?.modules.length;
  console.log(check);

  return (
    <div className="bg-[#f2e9ff]">
      <Header />
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex gap-8">
          <div className="flex-grow">
            <CourseDetailsMain course={courseDetails} />

            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-semibold">Skill level</p>
                  <p className="text-sm">{courseDetails?.level}</p>
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
          <CourseDetailsCard course={courseDetails} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
