import React from 'react'
import TutorSidebar from '../../tutor/components/TutorSidebar'

const TutorDashboard = () => {
  return (
      <div className="h-screen bg-gray-100">
        <div className="flex h-full">
          <TutorSidebar />
          <h2>Tutor Dashboard</h2>
        </div>
      </div>
    )
  
}

export default TutorDashboard