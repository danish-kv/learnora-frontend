import React from 'react'
import TutorSidebar from '../../tutor/components/TutorSidebar'

const TutorProfile = () => {
  return (
    <div className="h-screen bg-gray-100">
      <div className="flex h-full">
        <TutorSidebar />
        <h2>Tutor profile</h2>
      </div>
    </div>
  )
}

export default TutorProfile