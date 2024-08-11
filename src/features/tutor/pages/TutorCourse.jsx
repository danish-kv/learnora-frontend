import React from 'react'
import TutorSidebar from '../../tutor/components/TutorSidebar'

const TutorCourse = () => {
  return (
    <div className="h-screen bg-gray-100">
      {/* <AdminHeader /> */}
      <div className="flex h-full">
        <TutorSidebar />
        <h2>Tutor course</h2>
      </div>
    </div>
  )
}

export default TutorCourse