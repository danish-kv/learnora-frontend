import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EnrolledCourseCard from "./EnrolledCourseCard";

const ProfileView = ({ profile }) => {
  if (!profile) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg border  p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
            <AvatarImage className="object-cover"
              src={profile.profile || "https://github.com/shadcn.png"}
              alt={profile.username}
            />
            <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {profile.username}
            </h1>
            <p className="text-gray-600 mt-2">{profile.email}</p>
            <p className="mt-4 text-gray-700">
              {profile.bio || "No bio available."}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg  border  p-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Enrolled Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profile.enrolled_courses?.length > 0 ? (
            profile.enrolled_courses.map((course, index) => (
              <EnrolledCourseCard course={course} key={index} />
            ))
          ) : (
            <p className="col-span-full text-gray-600 text-center py-4">
              No enrolled courses found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
