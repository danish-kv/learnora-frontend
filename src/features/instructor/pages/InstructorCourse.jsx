import React from 'react'
import InstructorSidebar from '../components/InstructorSidebar'

const InstructorCourse = () => {
  return (
    <div className="h-screen bg-gray-100">
      {/* <AdminHeader /> */}
      <div className="flex h-full">
        <InstructorSidebar />
        <h2>Instrucotr course</h2>
      </div>
    </div>
  )
}

export default InstructorCourse