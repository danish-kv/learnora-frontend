import React from 'react'
import InstructorSidebar from '../components/InstructorSidebar'

const InstructorDashboard = () => {
  return (
      <div className="h-screen bg-gray-100">
        <div className="flex h-full">
          <InstructorSidebar />
          <h2>Instrucot Dashboard</h2>
        </div>
      </div>
    )
  
}

export default InstructorDashboard