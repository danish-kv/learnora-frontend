import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EnrolledCourseCard from './EnrolledCourseCard';



const ProfileView = ({profile}) => {
  if (!profile){
    return null
  }
console.log('checkkkkkkkkkkkkkkk', profile);


  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="w-24 h-24">
        <AvatarImage src={profile.profile || 'default-avatar.png'} alt={profile.username} />
        <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{profile.username}</h1>
        </div>
      </div>
      <p className="mb-8">{profile.bio || "No bio available"}.</p>
      <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profile.enrolled_courses?.length > 0 ? (
          profile.enrolled_courses.map((course, index) => (
            <EnrolledCourseCard
              course={course}
              key={index}
            />
          ))
        ) : (
          <p>No enrolled courses found.</p>
        )}
      </div>
    </div>
  )
}

export default ProfileView