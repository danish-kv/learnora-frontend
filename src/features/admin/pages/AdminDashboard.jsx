import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminMainContent from '../components/AdminMainContent'
import AdminHeader from '../components/AdminHeader'

const AdminDashboard = () => {
  return (
    <div className="h-screen bg-gray-100">
      {/* <AdminHeader /> */}
      <div className="flex h-full">
        <AdminSidebar />
        <AdminMainContent />
      </div>
    </div>
  )
}

export default AdminDashboard