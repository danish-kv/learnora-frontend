import React from 'react'
import InstructorSidebar from '../components/InstructorSidebar'

const InstructorProfile = () => {
  return (
    <div className="h-screen bg-gray-100">
      <div className="flex h-full">
        <InstructorSidebar />
        <h2>Instructor profile</h2>
      </div>
    </div>
  )
}

export default InstructorProfile